/**
 * MÓDULO JAVASCRIPT: CAMPUS SOSTENIBLE
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Brief: Sección 8.5
 * 
 * Funcionalidades:
 * 1. Inicialización de microinteracciones en las tarjetas de campañas.
 * 2. Manejo de anclas con smooth scroll accesible para #biciwiener y #huella-carbono.
 * 3. Observador de intersección para revelado progresivo tipo ANZSOG.
 */

export function initCampusSostenible() {
  const section = document.getElementById('campus-sostenible-section');
  if (!section) return;

  // 1. Galería de Fotos Biciwiener 16:9 con Auto-Slide y Transición Suave (Crossfade)
  const biciwienerGalleryEl = section.querySelector('.js-biciwiener-gallery-swiper');
  if (biciwienerGalleryEl && typeof window.Swiper !== 'undefined') {
    try {
      new window.Swiper(biciwienerGalleryEl, {
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
          el: biciwienerGalleryEl.querySelector('.js-biciwiener-pagination'),
          clickable: true,
        },
      });
      console.log('✅ Biciwiener: Slider automático 16:9 inicializado.');
    } catch (err) {
      console.warn('⚠️ Error al inicializar Swiper en Biciwiener:', err);
    }
  }

  // 2. Interacción suave para enlaces internos a subsecciones de Campus
  const hashLinks = section.querySelectorAll('a[href^="#"]');
  hashLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });

  console.log('✅ Campus Sostenible: Módulo institucional inicializado.');
}
