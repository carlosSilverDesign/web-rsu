/**
 * MÓDULO JAVASCRIPT: VOLUNTARIADO WIENER
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Brief: Sección 8.4 - Voluntariado
 * 
 * Funcionalidades:
 * 1. Inicialización y soporte para la grilla temática de Voluntariado (4 temáticas fijas).
 * 2. Soporte para enlaces directos / anclas hacia las iniciativas y la Brigada Ambiental.
 */

export function initVoluntariado() {
  const section = document.getElementById('voluntariado-section');
  if (!section) return;

  const cards = section.querySelectorAll('.c-voluntariado-card');
  const brigadaBlock = document.getElementById('brigada-ambiental');

  // Asegurar visibilidad de todas las tarjetas temáticas
  cards.forEach(card => {
    card.classList.remove('is-hidden');
  });

  if (brigadaBlock) {
    brigadaBlock.style.display = 'block';
  }

  console.log('✅ Voluntariado Wiener: Iniciativas y Brigada Ambiental inicializadas.');
}
