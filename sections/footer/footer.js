/**
 * FOOTER INSTITUCIONAL - CONTROLADOR JAVASCRIPT
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Características: Botón accesible 'Volver arriba' sincronizado con Lenis
 */

export function initFooter() {
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (!btnBackToTop) return;

  btnBackToTop.addEventListener('click', () => {
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
}
