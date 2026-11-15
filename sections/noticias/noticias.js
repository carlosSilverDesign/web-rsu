/**
 * MÓDULO JAVASCRIPT: NOTICIAS RSU
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Funcionalidades:
 * 1. Filtrado dinámico estilo Magazine (Todas, Voluntariado, Proyectos, Reconocimientos, Eventos).
 * 2. Contador de resultados visibles en tiempo real.
 * 3. Animaciones fluidas de entrada y salida tipo ANZSOG / Vulture.
 */

export function initNoticias() {
  const section = document.getElementById('noticias-section');
  if (!section) return;

  const filterBtns = section.querySelectorAll('[data-noticias-filter]');
  const items = section.querySelectorAll('.c-noticia-item');
  const visibleCountEl = document.getElementById('visible-count');
  const counterText = document.getElementById('noticias-counter');

  if (filterBtns.length === 0 || items.length === 0) return;

  function updateCount(count, filterName) {
    if (visibleCountEl) {
      visibleCountEl.textContent = count;
    }
    if (counterText) {
      if (count === 0) {
        counterText.innerHTML = `No se encontraron notas para la categoría <strong>${filterName}</strong>`;
      } else {
        counterText.innerHTML = `Mostrando <strong id="visible-count">${count}</strong> de <strong>${items.length}</strong> notas informativas`;
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-noticias-filter');
      const filterName = btn.querySelector('span:nth-child(2)') ? btn.querySelector('span:nth-child(2)').textContent : btn.textContent;

      // 1. Actualizar estado visual de los botones
      filterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      // 2. Filtrar elementos de noticias (Lead + Feed Grid)
      let visibleCount = 0;
      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const matches = (filterValue === 'all') || (itemCategory === filterValue);

        if (matches) {
          visibleCount++;
          item.classList.remove('is-hidden');
          item.style.opacity = '0';
          item.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.classList.add('is-hidden');
        }
      });

      // 3. Actualizar contador
      updateCount(visibleCount, filterName);
    });
  });

  console.log('✅ Noticias RSU: Feed estilo Magazine y filtros interactivos inicializados.');
}
