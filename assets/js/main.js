/**
 * ORQUESTADOR PRINCIPAL JAVASCRIPT (ES6 MODULE)
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Inicializa los módulos de la Home y páginas internas
 */

import { initLenis } from './lenis-init.js';
import { initScrollObserver } from './scroll-observer.js';
import { initHeader } from '../../sections/header/header.js';
import { initHero } from '../../sections/hero/hero.js';
import { initIniciativas } from '../../sections/iniciativas/iniciativas.js';
import { initHuellaWiener } from '../../sections/huella-wiener/huella-wiener.js';
import { initReconocimientos } from '../../sections/reconocimientos/reconocimientos.js';
import { initAliados } from '../../sections/aliados/aliados.js';
import { initFooter } from '../../sections/footer/footer.js';
import { initModeloRsu } from '../../sections/modelo-rsu/modelo-rsu.js';
import { initProyectosEmblematicos } from '../../sections/proyectos-emblematicos/proyectos-emblematicos.js';
import { initVoluntariado } from '../../sections/voluntariado/voluntariado.js';
import { initCampusSostenible } from '../../sections/campus-sostenible/campus-sostenible.js';
import { initSemanaSostenibilidad } from '../../sections/semana-sostenibilidad/semana-sostenibilidad.js';
import { initNoticias } from '../../sections/noticias/noticias.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar scroll suave inercial (Lenis)
  initLenis();

  // 2. Inicializar observador global de scroll reveal
  initScrollObserver();

  // 3. Inicializar Header & Mega Menú
  initHeader();

  // 4. Inicializar Hero Banner Slider Parallax (Home)
  initHero();

  // 5. Inicializar Presentación de Iniciativas (Home)
  initIniciativas();

  // 6. Inicializar Huella Wiener - Contadores Dinámicos (Home)
  initHuellaWiener();

  // 7. Inicializar Reconocimientos Obtenidos (Home)
  initReconocimientos();

  // 8. Inicializar Aliados Estratégicos - Marquee Ticker (Home)
  initAliados();

  // 9. Inicializar Footer Institucional y Scroll-to-Top (Global)
  initFooter();

  // 10. Inicializar Modelo RSU (Página interna Quiénes Somos)
  initModeloRsu();

  // 11. Inicializar Proyectos Emblemáticos y Académicos (Página interna Proyectos)
  initProyectosEmblematicos();

  // 12. Inicializar Voluntariado Wiener (Página interna Voluntariado)
  initVoluntariado();

  // 13. Inicializar Campus Sostenible (Página interna Campus Sostenible)
  initCampusSostenible();

  // 14. Inicializar Semana de la Sostenibilidad (Página interna Semana Sostenibilidad)
  initSemanaSostenibilidad();

  // 15. Inicializar Noticias RSU (Página interna Noticias)
  initNoticias();

  console.log('✅ Web RSU Norbert Wiener: Módulos del Home y páginas internas inicializados.');
});
