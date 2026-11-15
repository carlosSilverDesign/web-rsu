/**
 * MÓDULO JAVASCRIPT: SEMANA DE LA SOSTENIBILIDAD
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Brief: Sección Showcase con Video Oficial + Panel de Expertos y Actividades
 */

export function initSemanaSostenibilidad() {
  const section = document.getElementById('semana-sostenibilidad-section');
  if (!section) return;

  // Interacción para el botón de reproducción del video oficial
  const playBtn = section.querySelector('.c-video-play-btn');
  const videoPlaceholder = section.querySelector('.c-semana-video-placeholder');

  if (playBtn && videoPlaceholder) {
    const handleVideoClick = (e) => {
      e.preventDefault();
      // Feedback accesible visual
      const labelText = videoPlaceholder.querySelector('.c-video-label-text');
      if (labelText) {
        labelText.textContent = 'Espacio de video: La integración audiovisual se cargará con la URL multimedia oficial provista por la universidad.';
        labelText.style.color = '#2EE5F0';
        labelText.style.fontWeight = '700';
      }
    };

    playBtn.addEventListener('click', handleVideoClick);
    videoPlaceholder.addEventListener('click', (e) => {
      if (e.target !== playBtn && !playBtn.contains(e.target)) {
        handleVideoClick(e);
      }
    });
  }

  console.log('✅ Semana de la Sostenibilidad: Módulo interactivo inicializado.');
}
