// custom animation library
// Lightweight slide + fade animation triggered when elements enter the viewport.
// Add the classes `.animated-left` or `.animated-right` to any HTML element.
console.log("[Muv.js] is running.");

/**
 * Core animation function
 * @param {HTMLElement} el - Target element
 * @param {number} fromX - X offset in px
 * @param {number} fromY - Y offset in px
 * @param {number} duration - Duration in ms
 * @param {function} easing - Easing function
 * @param {string} baseTransform - Any existing CSS transform to preserve
 */

(function injectMuvCSS() {
    const style = document.createElement('style');
    style.textContent = `
      .animated-left,
      .animated-right,
      .animated-top,
      .animated-bottom {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
})();

function muv(el, fromX, fromY, duration = 800, easing = t => t * (2 - t), baseTransform = '') {
    const startTime = performance.now();
  
    function tick(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = easing(t);
  
      const x = fromX * (1 - eased);
      const y = fromY * (1 - eased);
  
      el.style.transform = `${baseTransform} translate(${x}px, ${y}px)`;
      el.style.opacity = eased;
  
      if (t < 1) requestAnimationFrame(tick);
    }
  
    requestAnimationFrame(tick);
}
  
/**
 * Initialize animations for elements with classes:
 * .animated-left, .animated-right, .animated-top, .animated-bottom
 */
function initMuvAutoAnimations() {
  const elements = document.querySelectorAll(
    '.animated-left, .animated-right, .animated-top, .animated-bottom'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        observer.unobserve(el);

        let fromX = 0, fromY = 0;
        if (el.classList.contains('animated-left')) fromX = -100;
        if (el.classList.contains('animated-right')) fromX = 100;
        if (el.classList.contains('animated-top')) fromY = -100;
        if (el.classList.contains('animated-bottom')) fromY = 100;

        // Use data attribute or hardcoded base transform
        const baseTransform = el.dataset.baseTransform || '';

        muv(el, fromX, fromY, 800, t => t * (2 - t), baseTransform);
      });
    },
    { threshold: 0.1 }
  );

  // Initialize elements with opacity 0 + starting offset
  elements.forEach((el) => {
    let fromX = 0, fromY = 0;
    if (el.classList.contains('animated-left')) fromX = -100;
    if (el.classList.contains('animated-right')) fromX = 100;
    if (el.classList.contains('animated-top')) fromY = -100;
    if (el.classList.contains('animated-bottom')) fromY = 100;

    // Use explicit base transform for absolute/fixed elements
    const baseTransform = el.dataset.baseTransform || '';

    el.style.opacity = 0;
    el.style.transform = `${baseTransform} translate(${fromX}px, ${fromY}px)`;

    observer.observe(el);
  });
}

// Use the below initialization if you plan to run the script in <head> with defer/async (not recommended)
// document.addEventListener('DOMContentLoaded', initMuvAutoAnimations)
window.addEventListener('load', initMuvAutoAnimations);