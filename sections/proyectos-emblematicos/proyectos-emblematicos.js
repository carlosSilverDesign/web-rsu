/**
 * MÓDULO JAVASCRIPT: PROYECTOS EMBLEMÁTICOS Y ACADÉMICOS
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Brief: Sección 8.3
 * 
 * Funcionalidades:
 * 1. Inicialización de Swiper v11 con vista parcial (peek) del siguiente proyecto y desvanecimiento.
 * 2. Soporte para click en el slide asomado o botones circulares (slideToClickedSlide: true).
 * 3. Galería de fotos con auto-slide y transición suave (crossfade) en proporción 16:9.
 * 4. Filtro interactivo por categorías para las iniciativas académicas destacadas.
 */

export function initProyectosEmblematicos() {
  const swiperElement = document.querySelector('.js-proyectos-swiper');
  
  // ==========================================================================
  // 1. CARRUSEL PRINCIPAL DE PROYECTOS EMBLEMÁTICOS
  // ==========================================================================
  // Permite ver un fragmento del siguiente proyecto (peek) con desvanecimiento
  if (swiperElement && typeof window.Swiper !== 'undefined') {
    try {
      const proyectosSwiper = new window.Swiper(swiperElement, {
        // En mobile se ve el proyecto activo y asoma un 8% del siguiente
        slidesPerView: 1.08,
        spaceBetween: 16,
        speed: 450,
        grabCursor: true,
        autoHeight: false,
        watchOverflow: true,
        watchSlidesProgress: true,
        
        // Al hacer click en el elemento siguiente asomado, avanza directamente
        slideToClickedSlide: true,

        // Puntos de ruptura responsive: vista parcial configurable
        breakpoints: {
          640: {
            slidesPerView: 1.12,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1.16, // En desktop se ve el 1er proyecto completo y 16% del siguiente
            spaceBetween: 28,
          },
        },
        
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

      console.log('✅ Swiper Proyectos Emblemáticos inicializado con peek y slideToClickedSlide.');
    } catch (error) {
      console.warn('⚠️ Error al inicializar Swiper en Proyectos Emblemáticos:', error);
    }
  }

  // ==========================================================================
  // 2. GALERÍAS DE FOTOS 16:9 CON AUTO-SLIDE Y TRANSICIÓN SUAVE (CROSSFADE)
  // ==========================================================================
  const galleryElements = document.querySelectorAll('.js-proyecto-gallery-swiper');
  if (galleryElements.length > 0 && typeof window.Swiper !== 'undefined') {
    galleryElements.forEach((galleryEl) => {
      try {
        new window.Swiper(galleryEl, {
          slidesPerView: 1,
          loop: true,
          speed: 800, // Transición suave entre imágenes
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          autoplay: {
            delay: 3500, // Pasa automáticamente cada 3.5 segundos
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          pagination: {
            el: galleryEl.querySelector('.js-gallery-pagination'),
            clickable: true,
          },
          nested: true, // Evita conflictos con el slider padre
          touchStartPreventDefault: false,
        });
      } catch (err) {
        console.warn('⚠️ Error al inicializar galería automática 16:9:', err);
      }
    });
    console.log(`✅ ${galleryElements.length} galerías 16:9 con auto-slide inicializadas.`);
  }

  // ==========================================================================
  // 3. FILTRO INTERACTIVO DE INICIATIVAS ACADÉMICAS
  // ==========================================================================
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

        // En pantallas táctiles, hacer scroll suave para mantener el botón visible si es necesario
        if (window.innerWidth <= 768) {
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    });
  }
}
