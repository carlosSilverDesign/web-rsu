/**
 * MÓDULO JAVASCRIPT: NOTICIAS RSU
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Funcionalidades:
 * 1. Inicialización de notas de prensa estilo Magazine editorial.
 * 2. Visualización fluida de la Lead Story y el feed cronológico.
 */

export function initNoticias() {
  const section = document.getElementById('noticias-section');
  if (!section) return;

  const items = section.querySelectorAll('.c-noticia-item');
  items.forEach(item => {
    item.classList.remove('is-hidden');
  });

  console.log('✅ Noticias RSU: Feed estilo Magazine editorial inicializado.');
}
