// ══════════════════════════════════════════════
// PIXEL ALPACA RUNNER — paste at bottom of main.js
// ══════════════════════════════════════════════
(function() {
  function initAlpaca() {
    const el = document.querySelector('.alpaca-runner');
    const container = document.querySelector('.header-inner');
    if (!el || !container) return;

    const SPEED = 80;        // px per second
    const BOB_SPEED = 300;   // ms per bob cycle
    const PAUSE_MS = 1200;   // pause at each end

    let x, minX, maxX, dir, paused, bobT;

    function recalcBounds() {
      const wordmark = container.querySelector('.wordmark');
      const homeBtn = container.querySelector('nav .nav-btn:first-child');
      minX = wordmark ? wordmark.offsetLeft + wordmark.offsetWidth + 8 : 170;
      maxX = homeBtn ? homeBtn.offsetLeft - el.offsetWidth - 8 : minX + 120;
    }

    function reset() {
      recalcBounds();
      x = minX;
      dir = 1; // moving right
      paused = false;
      bobT = 0;
    }

    let last = null;
    function frame(ts) {
      if (!last) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;

      if (!paused) {
        x += dir * SPEED * dt;
        bobT += dt;

        // bob up/down
        const bob = Math.sin(bobT * (2 * Math.PI / (BOB_SPEED / 1000))) * 3;
        el.style.top = `calc(50% + ${bob}px)`;

        // hit right wall
        if (dir === 1 && x >= maxX) {
          x = maxX;
          paused = true;
          el.style.transform = `translateY(-50%) scaleX(1)`;
          setTimeout(() => {
            dir = -1;
            el.style.transform = `translateY(-50%) scaleX(-1)`;
            paused = false;
          }, PAUSE_MS);
        }

        // hit left wall
        if (dir === -1 && x <= minX) {
          x = minX;
          paused = true;
          el.style.transform = `translateY(-50%) scaleX(-1)`;
          setTimeout(() => {
            dir = 1;
            el.style.transform = `translateY(-50%) scaleX(1)`;
            paused = false;
          }, PAUSE_MS);
        }

        el.style.left = x + 'px';
      }

      requestAnimationFrame(frame);
    }

    reset();
    requestAnimationFrame(frame);

    // recalc on resize
    window.addEventListener('resize', () => { recalcBounds(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAlpaca);
  } else {
    initAlpaca();
  }
})();
