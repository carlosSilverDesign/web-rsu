/**
 * ORQUESTADOR PRINCIPAL JAVASCRIPT (ES6 MODULE)
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Inicializa los módulos globales y componentes de sección
 */

import { initLenis } from './lenis-init.js';
import { initScrollObserver } from './scroll-observer.js';
import { initHeader } from '../../sections/header/header.js';
import { initHero } from '../../sections/hero/hero.js';
import { initIniciativas } from '../../sections/iniciativas/iniciativas.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar scroll suave inercial (Lenis)
  initLenis();

  // 2. Inicializar observador de scroll reveal (IntersectionObserver)
  initScrollObserver();

  // 3. Inicializar Sección 1: Header y Mega Menú
  initHeader();

  // 4. Inicializar Sección 2: Hero Banner Slider
  initHero();

  // 5. Inicializar Sección 3: Presentación de Iniciativas
  initIniciativas();

  console.log('✅ Web RSU Norbert Wiener: Header, Hero Banner e Iniciativas inicializados correctamente.');
});
