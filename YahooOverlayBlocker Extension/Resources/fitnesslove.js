// CSSのみで案内が残るケースに対応。確認済みの案内と全面広告の親要素だけを削除する。
(() => {
    if (!['fitnesslove.net', 'www.fitnesslove.net'].includes(location.hostname)) return;

    let removedCount = 0;
    function removeRewardModal() {
        document.querySelectorAll(
            '.reward-block.js-reward-modal, ' +
            'ins[id="gpt_unit_/9176203,22484934497/1759871_0"][data-vignette-loaded="true"]'
        )
            .forEach(modal => { modal.remove(); removedCount += 1; });
    }

    // 後から挿入される場合と、挿入後にクラスが付く場合にも対応する。
    const observer = new MutationObserver(removeRewardModal);
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id', 'data-vignette-loaded']
    });
    removeRewardModal();

    // 診断の登録失敗が広告削除処理を妨げないよう、初期化後に登録する。
    if (globalThis.browser?.runtime?.onMessage) {
        browser.runtime.onMessage.addListener(message => {
            if (message?.type === 'yob-fitnesslove-status') {
                return Promise.resolve({ revision: 'fitnesslove-3', removedCount });
            }
        });
    } else if (globalThis.chrome?.runtime?.onMessage) {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message?.type === 'yob-fitnesslove-status') {
                sendResponse({ revision: 'fitnesslove-3', removedCount });
            }
        });
    }
})();
