// 現在のタブ情報を取得
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url || "";
    const statusEl = document.getElementById("status");

    // Yahoo!ニュース記事ページかどうか判定
    if (/^https:\/\/news\.yahoo\.co\.jp\//.test(url)) {
        statusEl.textContent = "保護対象（広告ブロック中）";
        statusEl.style.color = "green";
    } else {
        statusEl.textContent = "対象外（このページでは動作しません）";
        statusEl.style.color = "gray";
    }
});
