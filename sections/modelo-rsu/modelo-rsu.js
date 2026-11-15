/**
 * NUESTRO MODELO RSU - CONTROLADOR JAVASCRIPT
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Características: Interacciones accesibles de cuadrantes y descargas normativas
 */

export function initModeloRsu() {
  const section = document.getElementById('modelo-rsu');
  if (!section) return;

  // Manejo accesible de botones de descarga de políticas
  const downloadButtons = section.querySelectorAll('.c-policy-card__download');

  downloadButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href === '#' || !href) {
        e.preventDefault();
        const policyTitle = btn.closest('.c-policy-card')?.querySelector('.c-policy-card__title')?.textContent || 'Documento Oficial';
        console.log(`📄 Descarga solicitada: ${policyTitle}`);
        // Notificación accesible al usuario
        alert(`Documento institucional: "${policyTitle}" disponible para consulta y descarga en el repositorio oficial de UNW.`);
      }
    });
  });
}
