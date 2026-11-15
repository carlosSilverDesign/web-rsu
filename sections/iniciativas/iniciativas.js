/**
 * PRESENTACIÓN DE INICIATIVAS - CONTROLADOR JAVASCRIPT
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Manejo de navegación suave por anclas hacia las secciones correspondientes
 */

export function initIniciativas() {
  const container = document.getElementById('iniciativas');
  if (!container) return;

  const actionButtons = container.querySelectorAll('.c-iniciativa-card__btn');

  actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          // Si Lenis está activo, usar su scroll suave
          if (window.lenisInstance) {
            window.lenisInstance.scrollTo(targetEl, { offset: -70 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });
}
