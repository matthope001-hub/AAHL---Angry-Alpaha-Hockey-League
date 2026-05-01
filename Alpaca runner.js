(function() {
  function initAlpaca() {
    const el = document.querySelector('.alpaca-runner');
    if (!el) return;

    let x = 170;
    let dir = 1;
    let paused = false;
    let bobT = 0;
    let last = null;

    const MIN_X = 170;
    const MAX_X = 320;
    const SPEED = 60;

    el.style.left = x + 'px';
    el.style.transform = 'translateY(-50%) scaleX(1)';

    function frame(ts) {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;

      if (!paused) {
        x += dir * SPEED * dt;
        bobT += dt;
        const bob = Math.sin(bobT * Math.PI * 2 / 0.3) * 3;
        el.style.top = 'calc(50% + ' + bob + 'px)';
        el.style.left = Math.round(x) + 'px';

        if (dir === 1 && x >= MAX_X) {
          x = MAX_X;
          paused = true;
          setTimeout(function() {
            dir = -1;
            el.style.transform = 'translateY(-50%) scaleX(-1)';
            paused = false;
          }, 1000);
        }

        if (dir === -1 && x <= MIN_X) {
          x = MIN_X;
          paused = true;
          setTimeout(function() {
            dir = 1;
            el.style.transform = 'translateY(-50%) scaleX(1)';
            paused = false;
          }, 1000);
        }
      }

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAlpaca);
  } else {
    initAlpaca();
  }
})();
