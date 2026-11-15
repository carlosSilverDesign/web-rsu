/**
 * HUELLA WIENER - CONTROLADOR JAVASCRIPT
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Características: Contadores numéricos dinámicos de 0 a meta con easeOutQuad
 */

export function initHuellaWiener() {
  const section = document.getElementById('huella-wiener');
  if (!section) return;

  const counterElements = section.querySelectorAll('[data-counter-target]');
  if (counterElements.length === 0) return;

  // Formateador de números con separadores de miles (ej: 102,141)
  const formatNumber = (num) => {
    return Math.floor(num).toLocaleString('en-US');
  };

  // Función de aceleración suave (easeOutQuad)
  const easeOutQuad = (t) => t * (2 - t);

  // Animación del contador individual
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter-target'), 10);
    if (isNaN(target)) return;

    // Respetar preferencias de reducción de movimiento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = formatNumber(target);
      return;
    }

    const duration = 1600; // 1.6s
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentVal = target * easedProgress;

      el.textContent = formatNumber(currentVal);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatNumber(target);
      }
    }

    requestAnimationFrame(update);
  }

  // IntersectionObserver para iniciar la animación cuando la sección entre al viewport
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counterElements.forEach(counterEl => {
          animateCounter(counterEl);
        });
        obs.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, {
    threshold: 0.25, // Se activa cuando al menos el 25% de la sección es visible
    rootMargin: '0px 0px -50px 0px'
  });

  observer.observe(section);
}
