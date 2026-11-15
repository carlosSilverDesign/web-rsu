/**
 * OBSERVADOR GLOBAL DE SCROLL REVEAL (INTERSECTION OBSERVER)
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Activa la clase .state-visible al entrar los elementos en pantalla (estilo ANZSOG)
 */

export function initScrollObserver() {
  // Si el usuario prefiere movimiento reducido, mostrar todo directamente
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.c-transition-in').forEach(el => {
      el.classList.add('state-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('state-visible');
        obs.unobserve(entry.target); // Solo se anima una vez
      }
    });
  }, {
    rootMargin: '0px 0px -100px 0px', // Se activa 100px antes de tocar el borde inferior
    threshold: 0.05
  });

  document.querySelectorAll('.c-transition-in').forEach(el => {
    observer.observe(el);
  });
}
