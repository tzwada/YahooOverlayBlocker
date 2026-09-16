// 現在のタブ情報を取得
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0]?.url || "";
    const statusEl = document.getElementById("status");

    // 対応するニュースサイトかどうか判定
    if (/^https:\/\/(?:news\.yahoo\.co\.jp|bunshun\.jp|(?:www\.)?fitnesslove\.net)\//.test(url)) {
        statusEl.textContent = "対応サイト（広告非表示の対象）";
        statusEl.style.color = "green";
        if (/^https:\/\/(?:www\.)?fitnesslove\.net\//.test(url)) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'yob-fitnesslove-status' }, response => {
                if (chrome.runtime.lastError || response?.revision !== 'fitnesslove-3') {
                    statusEl.textContent = '実行状態を取得できません（CSSの適用状態は判定できません）。';
                    statusEl.style.color = 'darkorange';
                    return;
                }
                statusEl.textContent = `処理実行中（fitnesslove-3／案内削除 ${response.removedCount} 件）`;
            });
        }
    } else {
        statusEl.textContent = "対象外（このページでは動作しません）";
        statusEl.style.color = "gray";
    }
});
