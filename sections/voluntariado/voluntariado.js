/**
 * MÓDULO JAVASCRIPT: VOLUNTARIADO WIENER
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Brief: Sección 8.4
 * 
 * Funcionalidades:
 * 1. Filtrado interactivo por temáticas (Educativo, Cultural, Ambiental, Salud, Brigada).
 * 2. Microinteracciones de entrada y salida con animación fluida.
 * 3. Enlace accesible para convocatoria y scroll asistido.
 */

export function initVoluntariado() {
  const section = document.getElementById('voluntariado-section');
  if (!section) return;

  const filterBtns = section.querySelectorAll('[data-voluntariado-filter]');
  const cards = section.querySelectorAll('.c-voluntariado-card');
  const brigadaBlock = document.getElementById('brigada-ambiental');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-voluntariado-filter');

      // 1. Actualizar estado de botones
      filterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      // 2. Filtrar tarjetas
      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const matches = (filterValue === 'all') || (cardCategory === filterValue);

        if (matches) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.classList.add('is-hidden');
        }
      });

      // 3. Manejo del bloque destacado Brigada Ambiental
      if (brigadaBlock) {
        if (filterValue === 'all' || filterValue === 'ambiental' || filterValue === 'brigada') {
          brigadaBlock.style.display = 'block';
          brigadaBlock.style.opacity = '0';
          requestAnimationFrame(() => {
            brigadaBlock.style.transition = 'opacity 0.3s ease';
            brigadaBlock.style.opacity = '1';
          });
          if (filterValue === 'brigada') {
            brigadaBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          brigadaBlock.style.display = 'none';
        }
      }
    });
  });

  console.log('✅ Voluntariado Wiener: Grid y filtros interactivos inicializados.');
}
