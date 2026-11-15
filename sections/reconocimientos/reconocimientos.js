/**
 * RECONOCIMIENTOS OBTENIDOS - CONTROLADOR JAVASCRIPT
 * Proyecto: Web RSU - Universidad Norbert Wiener (Brief 8.1)
 */

export function initReconocimientos() {
  const section = document.getElementById('reconocimientos');
  if (!section) return;

  // Interacción suave con las tarjetas de premios
  const awardCards = section.querySelectorAll('.c-award-card');
  awardCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.setAttribute('data-hovered', 'true');
    });
    card.addEventListener('mouseleave', () => {
      card.removeAttribute('data-hovered');
    });
  });
}
