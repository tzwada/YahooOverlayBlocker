// 文春オンラインのCM視聴・質問回答の案内と、それに伴うスクロールロックに対応。
(() => {
    if (location.hostname !== 'bunshun.jp') return;

    const adSelector = '.fc-message-root > .fc-monetization-dialog-container';
    const overrides = new Map();
    let recoveryUntil = 0;

    function hasOtherDialog() {
        return Array.from(document.querySelectorAll(
            'dialog[open], [aria-modal="true"], [role="dialog"]'
        )).some(el => !el.closest(adSelector) && el.getClientRects().length > 0 &&
            getComputedStyle(el).visibility !== 'hidden');
    }

    function restoreOverrides() {
        for (const [el, previous] of overrides) {
            // サイトが既に変更した値は上書きしない。
            if (el.style.getPropertyValue('overflow-y') === 'auto' &&
                el.style.getPropertyPriority('overflow-y') === 'important') {
                if (previous.value) el.style.setProperty('overflow-y', previous.value, previous.priority);
                else el.style.removeProperty('overflow-y');
            }
        }
        overrides.clear();
    }

    function recoverScroll() {
        // 通常のダイアログが開かれたら、こちらの補正を戻してサイトに任せる。
        if (hasOtherDialog()) {
            recoveryUntil = 0;
            restoreOverrides();
            return;
        }
        // 広告除去直後の処理だけを対象とし、通常閲覧中のロックを解除し続けない。
        if (Date.now() > recoveryUntil) return;
        for (const el of [document.documentElement, document.body]) {
            if (!el) continue;
            if (!['hidden', 'clip'].includes(getComputedStyle(el).overflowY)) continue;
            if (!overrides.has(el)) overrides.set(el, {
                value: el.style.getPropertyValue('overflow-y'),
                priority: el.style.getPropertyPriority('overflow-y')
            });
            // 縦方向だけ復旧。position・高さ・余白・スクロール位置は変更しない。
            el.style.setProperty('overflow-y', 'auto', 'important');
        }
    }

    function removeMonetizationDialog() {
        const containers = document.querySelectorAll(adSelector);
        if (containers.length) recoveryUntil = Date.now() + 2000;
        containers.forEach(container => {
            const root = container.parentElement;
            for (const child of Array.from(root.children)) {
                if (child.id === 'fc-focus-trap-pre-div' ||
                    child.id === 'fc-focus-trap-post-div') child.remove();
            }
            container.remove();
        });
        recoverScroll();
        if (containers.length) {
            // 広告の挿入後、別タスクでロックを設定するケースも拾う。
            requestAnimationFrame(recoverScroll);
            setTimeout(recoverScroll, 100);
            setTimeout(recoverScroll, 500);
        }
    }

    const observer = new MutationObserver(removeMonetizationDialog);
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'open', 'aria-modal']
    });
    removeMonetizationDialog();
})();
