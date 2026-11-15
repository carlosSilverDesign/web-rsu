/**
 * HERO BANNER - CONTROLADOR JAVASCRIPT
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Características: Swiper v11 con autoplay pausado en hover y parallax con scroll
 */

export function initHero() {
  const heroSliderEl = document.getElementById('hero-slider');
  if (!heroSliderEl) return;

  // Comprobar si Swiper está disponible
  if (typeof window.Swiper !== 'undefined') {
    const heroSwiper = new window.Swiper(heroSliderEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 650,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 6500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.c-hero-slider__pagination',
        clickable: true
      },
      navigation: {
        prevEl: '.c-hero-slider__btn--prev',
        nextEl: '.c-hero-slider__btn--next'
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      a11y: {
        prevSlideMessage: 'Diapositiva anterior',
        nextSlideMessage: 'Diapositiva siguiente',
        firstSlideMessage: 'Primera diapositiva',
        lastSlideMessage: 'Última diapositiva',
        paginationBulletMessage: 'Ir a diapositiva {{index}}'
      }
    });

    window.heroSwiperInstance = heroSwiper;
  }

  // ==========================================================================
  // PARALLAX SUAVE EN CAPAS DE FONDO CON EL SCROLL
  // ==========================================================================
  const bgWraps = document.querySelectorAll('.c-hero-slide__bg-wrap');
  if (bgWraps.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Solo aplicar si el hero está en el viewport
          if (scrollY < window.innerHeight * 1.2) {
            bgWraps.forEach(wrap => {
              wrap.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}
