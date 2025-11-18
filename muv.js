// custom animation library
// Lightweight slide + fade animation triggered when elements enter the viewport.
// Add the classes `.animated-left` or `.animated-right` to any HTML element.
console.log("[Muv.js] is running.")

/**
 * Core animation function
 * @param {HTMLElement} el - Target element to animate
 * @param {number} fromX - Starting X offset in pixels (e.g., -100 or 100)
 * @param {number} duration - Animation duration in milliseconds
 * @param {function} easing - Easing function (controls motion curve)
 */

function muv(el, fromX, duration = 800, easing = t => t * (2 - t)) {
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min((now - startTime) / duration, 1); // progress from 0 → 1
    const eased = easing(t);

    const x = fromX * (1 - eased);  // interpolate position
    const y = fromY * (1 - eased);

    // Apply transform and fade
    el.style.transform = `translateX(${x}px, ${y}px)`;
    el.style.opacity = eased;

    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initMuvAutoAnimations() {
  const elements = document.querySelectorAll('.animated-left, .animated-right, .animated-top. .animated-bottom');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      observer.unobserve(el); // run animation only once*

      // SETTINGS — initial offset distance (in px)
      // offsets based on class
      let fromX = 0, fromY = 0;
      if (el.classList.contains('animated-left')) fromX = -100;
      if (el.classList.contains('animated-right')) fromX = 100;
      if (el.classList.contains('animated-top')) fromY = -100;
      if (el.classList.contains('animated-bottom')) fromY = 100;

       // SETTINGS — initial appearance before animation
      el.style.opacity = 0;
      el.style.transform = `translateX(${fromX}px)`;

      // You can tweak duration, easing, or even customize per element
      muv(el, fromX, 800, t => t * (2 - t)); // 800ms, ease-out
    });
    // SETTINGS — percentage of element visible before animation triggers
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// Use the below initialization if you plan to run the script in <head> with defer/async (not recommended)
// document.addEventListener('DOMContentLoaded', initMuvAutoAnimations)
window.addEventListener('load', initMuvAutoAnimations);