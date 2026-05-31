function removeYahooOverlayAd() {
  // オーバーレイ広告を削除
  document
    .querySelectorAll('.yda_interstitial, #overlayAd, #interstitialAd')
    .forEach(el => el.remove());

  // スクロールロック解除
  const body = document.body;
  const html = document.documentElement;

  if (body) {
    body.style.overflow = '';
    body.style.paddingRight = '';
    body.classList.remove('modal-open', 'yads_body_fixed', 'noScroll');
  }
  if (html) {
    html.style.overflow = '';
  }
}

// ページ読み込み時
document.addEventListener('DOMContentLoaded', removeYahooOverlayAd);

// 動的に挿入される場合にも対応
const observer = new MutationObserver(removeYahooOverlayAd);
observer.observe(document.documentElement, { childList: true, subtree: true });
