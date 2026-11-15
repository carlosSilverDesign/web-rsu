/**
 * INICIALIZACIÓN DE LENIS (SMOOTH SCROLL)
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Replica la fluidez de desplazamiento inercial de ANZSOG
 */

export function initLenis() {
  // Respetar preferencias de reducción de movimiento
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  // Si Lenis está cargado en el entorno global
  if (typeof window.Lenis !== 'undefined') {
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.lenisInstance = lenis;
    return lenis;
  }

  return null;
}
