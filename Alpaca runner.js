// ══════════════════════════════════════════════
// PIXEL ALPACA RUNNER
// ══════════════════════════════════════════════
(function() {
  function initAlpaca() {
    const el = document.querySelector('.alpaca-runner');
    const container = document.querySelector('.header-inner');
    if (!el || !container) return;

    const SPEED = 80;
    const BOB_SPEED = 300;
    const PAUSE_MS = 1200;

    let x = 0, minX = 0, maxX = 100, dir = 1, paused = false, bobT = 0;

    function recalcBounds() {
      const cRect = container.getBoundingClientRect();
      const wordmark = container.querySelector('.wordmark');
      const homeBtn = container.querySelector('nav .nav-btn:first-child');

      const wRight = wordmark
        ? wordmark.getBoundingClientRect().right - cRect.left
        : 170;

      const hLeft = homeBtn
        ? homeBtn.getBoundingClientRect().left - cRect.left
        : wRight + 150;

      minX = wRight + 10;
      maxX = hLeft - el.offsetWidth - 10;
      if (maxX <= minX) maxX = minX + 60;
    }

    function reset() {
      recalcBounds();
      x = minX;
      dir = 1;
      paused = false;
      bobT = 0;
      el.style.left = x + 'px';
      el.style.transform = 'translateY(-50%) scaleX(1)';
    }

    let last = null;
    function frame(ts) {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;

      if (!paused) {
        x += dir * SPEED * dt;
        bobT += dt;
        const bob = Math.sin(bobT * (2 * Math.PI / (BOB_SPEED / 1000))) * 3;
        el.style.top = 'calc(50% + ' + bob + 'px)';
        el.style.left = x + 'px';

        if (dir === 1 && x >= maxX) {
          x = maxX; el.style.left = x + 'px'; paused = true;
          setTimeout(() => { dir = -1; el.style.transform = 'translateY(-50%) scaleX(-1)'; paused = false; }, PAUSE_MS);
        }
        if (dir === -1 && x <= minX) {
          x = minX; el.style.left = x + 'px'; paused = true;
          setTimeout(() => { dir = 1; el.style.transform = 'translateY(-50%) scaleX(1)'; paused = false; }, PAUSE_MS);
        }
      }
      requestAnimationFrame(frame);
    }

    setTimeout(() => { reset(); requestAnimationFrame(frame); }, 200);
    window.addEventListener('resize', recalcBounds);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAlpaca);
  } else {
    initAlpaca();
  }
})();
