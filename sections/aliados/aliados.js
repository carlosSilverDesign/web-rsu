/**
 * ALIADOS ESTRATÉGICOS - CONTROLADOR JAVASCRIPT
 * Proyecto: Web RSU - Universidad Norbert Wiener (Brief 8.1)
 */

export function initAliados() {
  const marqueeWrap = document.querySelector('.c-marquee-wrap');
  if (!marqueeWrap) return;

  // Pausa en dispositivos táctiles al mantener presionado
  marqueeWrap.addEventListener('touchstart', () => {
    const tracks = marqueeWrap.querySelectorAll('.c-marquee__track');
    tracks.forEach(track => track.style.animationPlayState = 'paused');
  }, { passive: true });

  marqueeWrap.addEventListener('touchend', () => {
    const tracks = marqueeWrap.querySelectorAll('.c-marquee__track');
    tracks.forEach(track => track.style.animationPlayState = 'running');
  }, { passive: true });
}
