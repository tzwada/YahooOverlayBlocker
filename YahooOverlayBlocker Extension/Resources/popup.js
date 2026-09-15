// 現在のタブ情報を取得
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0]?.url || "";
    const statusEl = document.getElementById("status");

    // 対応するニュースサイトかどうか判定
    if (/^https:\/\/(?:news\.yahoo\.co\.jp|bunshun\.jp)\//.test(url)) {
        statusEl.textContent = "対応サイト（広告非表示の対象）";
        statusEl.style.color = "green";
    } else {
        statusEl.textContent = "対象外（このページでは動作しません）";
        statusEl.style.color = "gray";
    }
});
