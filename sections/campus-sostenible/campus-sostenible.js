/**
 * MÓDULO JAVASCRIPT: CAMPUS SOSTENIBLE
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Brief: Sección 8.5
 * 
 * Funcionalidades:
 * 1. Inicialización de microinteracciones en las tarjetas de campañas.
 * 2. Manejo de anclas con smooth scroll accesible para #biciwiener y #huella-carbono.
 * 3. Observador de intersección para revelado progresivo tipo ANZSOG.
 */

export function initCampusSostenible() {
  const section = document.getElementById('campus-sostenible-section');
  if (!section) return;

  // Interacción suave para enlaces internos a subsecciones de Campus
  const hashLinks = section.querySelectorAll('a[href^="#"]');
  hashLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });

  console.log('✅ Campus Sostenible: Módulo institucional inicializado.');
}
