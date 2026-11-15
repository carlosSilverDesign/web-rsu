/**
 * MÓDULO JAVASCRIPT: PROYECTOS EMBLEMÁTICOS Y ACADÉMICOS
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Brief: Sección 8.3
 * 
 * Funcionalidades:
 * 1. Inicialización de Swiper v11 con progressbar continua de 2px (Estilo ANZSOG).
 * 2. Navegación circular accesible (anterior/siguiente) con soporte táctil y teclado.
 * 3. Filtro interactivo por categorías para las 11 iniciativas académicas destacadas.
 */

export function initProyectosEmblematicos() {
  const swiperElement = document.querySelector('.js-proyectos-swiper');
  
  // 1. Inicializar Carrusel Swiper de Proyectos Emblemáticos
  if (swiperElement && typeof window.Swiper !== 'undefined') {
    try {
      const proyectosSwiper = new window.Swiper(swiperElement, {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 350,
        grabCursor: true,
        autoHeight: false,
        watchOverflow: true,
        
        // Barra de progreso continua estilo ANZSOG
        pagination: {
          el: '.js-proyectos-progressbar',
          type: 'progressbar',
        },

        // Botones circulares de navegación
        navigation: {
          nextEl: '.js-proyectos-next',
          prevEl: '.js-proyectos-prev',
        },

        // Accesibilidad (WCAG 2.1 AA)
        a11y: {
          prevSlideMessage: 'Proyecto emblemático anterior',
          nextSlideMessage: 'Proyecto emblemático siguiente',
          firstSlideMessage: 'Este es el primer proyecto emblemático',
          lastSlideMessage: 'Este es el último proyecto emblemático',
          paginationBulletMessage: 'Ir al proyecto {{index}}',
        },

        // Soporte de navegación con teclado
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
      });

      console.log('✅ Swiper Proyectos Emblemáticos inicializado con éxito.');
    } catch (error) {
      console.warn('⚠️ Error al inicializar Swiper en Proyectos Emblemáticos:', error);
    }
  }

  // 2. Filtro interactivo de Iniciativas Académicas
  const filterBtns = document.querySelectorAll('.c-filter-btn');
  const academicCards = document.querySelectorAll('.c-academico-card');

  if (filterBtns.length > 0 && academicCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Actualizar estados visuales y accesibilidad
        filterBtns.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        // Filtrar tarjetas
        academicCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');
          if (filter === 'all' || cardCategory === filter) {
            card.classList.remove('is-hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }
}
