# Especificación Maestra y Prompt de Construcción Frontend: Web RSU Universidad Norbert Wiener

> **Uso del documento:** Este archivo `.md` es la **guía maestra de referencia, arquitectura y consulta permanente** para construir la página web de la **Dirección de Responsabilidad Social Universitaria (RSU)** de la Universidad Norbert Wiener (UNW).  
> Puede utilizarse tanto como documento de arquitectura técnica como bloque de instrucción directa (prompt) para asistentes de código y desarrolladores frontend.

---

## 0. Fuentes de Verdad y Jerarquía

1. **`Design.md` (Raíz del proyecto)**: **ÚNICA fuente de verdad visual**. Rige estrictamente la paleta de colores (`#0F848F` Primary Teal, `#222222` Dark, `#F4F6F8` Body Background, etc.), tipografías (`Lato` para títulos y encabezados; `Roboto` para cuerpo y metadatos), escala tipográfica, espaciados, radios de botón (`6px`), tarjetas (`8px` / `16px`) y estilos de botones. **NUNCA inventar colores ni usar los de la web de referencia ANZSOG.**
2. **`Brief - pagina RSU.docx`**: **ÚNICA fuente de verdad de contenidos, estructura institucional y objetivos**. Define las áreas misionales (Gestión Institucional, Formación Ético-Ciudadana, Proyección Social, Investigación con Enfoque RSU), proyectos emblemáticos, cifras de impacto, aliados, reconocimientos y notas de prensa.
3. **Análisis de Referencia ANZSOG (`anzsog.edu.au`)**: **ÚNICA fuente de verdad para el sistema de movimiento, interacciones y UX**. Aporta las curvas de aceleración exactas (`cubic-bezier`), duraciones de transición, comportamiento de menús desplegables (`clip-path`), elevación de tarjetas y el scroll inercial suave.

---

## 1. Stack Tecnológico

El proyecto se construye con tecnologías web fundamentales sin dependencias de frameworks pesados, garantizando máxima portabilidad, rendimiento extremo (Lighthouse ≥ 95) y compatibilidad total con WordPress / CMS institucional:

* **Estructura**: **HTML5 Semántico** puro (con atributos `aria-*` y etiquetas nativas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
* **Estilos**: **CSS3 Moderno** y modularizado:
  * CSS Custom Properties (Variables CSS) centralizadas para tokens de diseño y motion.
  * Flexbox y CSS Grid (rejilla estándar de 12 columnas en desktop, 4 en móvil).
  * Regla estricta de aceleración gráfica: animar exclusivamente `transform` y `opacity` con `will-change`.
* **Interactividad y Comportamiento**: **JavaScript ES6+ Vanilla** modular (sin jQuery ni frameworks reactivos).
* **Librerías externas ultraligeras permitidas**:
  1. **[Lenis v1+](https://lenis.darkroom.engineering/)** (`lenis.min.js`): Para el scroll suave inercial idéntico al de ANZSOG.
  2. **[Swiper v11](https://swiperjs.com/)** (`swiper-bundle.min.js` y `swiper-bundle.min.css`): Para los carruseles de proyectos, reconocimientos y noticias, configurado con barra de progreso (`progressbar`).

---

## 2. Arquitectura de Archivos y Modularidad de Secciones

Para garantizar orden, modularidad y **reutilización estricta**, cada sección del sitio contará con su propio trío de archivos con el **mismo nombre y distinta extensión**:

```
Web RSU/
├── index.html                     # Archivo ensamblador principal del Home
├── Design.md                      # Tokens y lineamientos visuales de UNW
├── Brief - pagina RSU.docx        # Brief institucional original
├── PROMPT_FRONTEND_RSU.md         # Este documento maestro de consulta
│
├── assets/
│   ├── css/
│   │   ├── variables.css          # Colores, fuentes, sombras y tokens de motion
│   │   ├── reset.css              # Normalización y box-sizing
│   │   ├── components.css         # COMPONENTES REUTILIZABLES (Botones, Headings, Cards)
│   │   └── global.css             # Layout global, contenedor 1082px/1280px, utilitarios
│   ├── js/
│   │   ├── lenis-init.js          # Inicialización global de scroll inercial
│   │   ├── scroll-observer.js     # IntersectionObserver global (.c-transition-in)
│   │   └── main.js                # Archivo orquestador principal
│   └── images/                    # Logotipos UNW, fotografías de iniciativas, iconos
│
└── sections/                      # MÓDULOS DE SECCIÓN (HTML + CSS + JS)
    ├── header/
    │   ├── header.html
    │   ├── header.css
    │   └── header.js
    ├── hero/
    │   ├── hero.html
    │   ├── hero.css
    │   └── hero.js
    ├── iniciativas/
    │   ├── iniciativas.html
    │   ├── iniciativas.css
    │   └── iniciativas.js
    ├── huella-wiener/
    │   ├── huella-wiener.html
    │   ├── huella-wiener.css
    │   └── huella-wiener.js
    ├── modelo-rsu/
    │   ├── modelo-rsu.html
    │   ├── modelo-rsu.css
    │   └── modelo-rsu.js
    ├── proyectos-emblematicos/
    │   ├── proyectos-emblematicos.html
    │   ├── proyectos-emblematicos.css
    │   └── proyectos-emblematicos.js
    ├── campus-voluntariado/
    │   ├── campus-voluntariado.html
    │   ├── campus-voluntariado.css
    │   └── campus-voluntariado.js
    ├── semana-sostenibilidad/
    │   ├── semana-sostenibilidad.html
    │   ├── semana-sostenibilidad.css
    │   └── semana-sostenibilidad.js
    ├── reconocimientos/
    │   ├── reconocimientos.html
    │   ├── reconocimientos.css
    │   └── reconocimientos.js
    ├── aliados/
    │   ├── aliados.html
    │   ├── aliados.css
    │   └── aliados.js
    ├── noticias/
    │   ├── noticias.html
    │   ├── noticias.css
    │   └── noticias.js
    └── footer/
        ├── footer.html
        ├── footer.css
        └── footer.js
```

---

## 3. Tokens de Motion y Sistema de Transiciones (Extraídos de ANZSOG)

Estos valores deben declararse en `assets/css/variables.css` y usarse consistentemente en todos los módulos:

```css
:root {
  /* Duraciones */
  --duration-fast: 0.2s;      /* 200ms: Hovers de botones, flechas, iconos */
  --duration-hover: 0.3s;     /* 300ms: Elevación de tarjetas, sombras */
  --duration-slider: 0.3s;    /* 300ms: Transición de diapositivas Swiper */
  --duration-nav: 0.4s;       /* 400ms: Apertura de mega menú y drawers */
  --duration-reveal: 0.7s;    /* 700ms: Entrada de bloques con scroll */
  --duration-hero: 0.9s;      /* 900ms: Entrada del banner hero */
  --duration-counter: 1.5s;   /* 1500ms: Conteo de números de impacto */

  /* Curvas de Aceleración (Cubic-Bezier exactos de ANZSOG) */
  --ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1);       /* Scroll reveal general */
  --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);     /* Drawers y acordeones */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);      /* Mega-menú y cortinas */
  --ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1);   /* Estados hover y colores */
  --ease-swiper: cubic-bezier(0.25, 0.1, 0.25, 1);      /* Deslizamiento de slides */

  /* Parámetros de Scroll Reveal */
  --reveal-distance: 3rem;     /* 48px: Distancia de desplazamiento Y */
  --reveal-stagger: 0.1s;      /* 100ms: Retardo escalonado entre hijos */
}

/* Modo Accesibilidad: Reducción de Movimiento */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .c-transition-in {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

### Motor Global de Scroll Reveal (`assets/js/scroll-observer.js`):
```javascript
export function initScrollObserver() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('state-visible');
        obs.unobserve(entry.target); // Se revela una sola vez
      }
    });
  }, {
    rootMargin: '0px 0px -100px 0px', // Se activa 100px antes de tocar el borde inferior
    threshold: 0
  });

  document.querySelectorAll('.c-transition-in').forEach(el => observer.observe(el));
}
```

---

## 4. Componentes Reutilizables (Token Economy & Máxima Consistencia)

Para **ahorrar tokens, evitar duplicación de código CSS y mantener la coherencia**, las secciones **DEBEN REUTILIZAR** las clases de componentes globales declaradas en `assets/css/components.css`. NINGUNA sección debe volver a estilizar botones, títulos o tarjetas desde cero.

### 4.1 Encabezado de Sección con Énfasis (`.c-section-heading`)
Patrón editorial de ANZSOG adaptado a Wiener: Título H2 con **segunda parte enfatizada** en color primario teal (`#0F848F`) o negrita (`font-weight: 900`).
```html
<div class="c-section-header c-transition-in">
  <span class="c-eyebrow">DIRECCIÓN DE RESPONSABILIDAD SOCIAL</span>
  <h2 class="c-section-title">Huella Wiener: <span class="c-text-emphasis">Resultados que transforman vidas</span></h2>
  <p class="c-section-subtitle">Nuestros resultados reflejan el compromiso de estudiantes, docentes y colaboradores...</p>
</div>
```

### 4.2 Botones Estandarizados (`.c-btn`)
Tomados estrictamente de `Design.md` (radio: `6px`, fuente: `Roboto` 700):
* `.c-btn--primary`: Fondo `#0F848F`, texto `#FFFFFF`. Hover: `#0B6770`.
* `.c-btn--secondary`: Fondo `#1E293B`, texto `#FFFFFF`. Hover: `#334155`.
* `.c-btn--outline`: Fondo transparente, borde `1px solid #0F848F`, texto `#0F848F`. Hover: Fondo `#0F848F`, texto `#FFFFFF`.
* `.c-btn--black`: Fondo `#222222`, texto `#FFFFFF`.
* **Microinteracción transversal**: El icono `.c-btn__arrow` se desplaza `+4px` a la derecha en hover en `0.2s ease-in-out`.

### 4.3 Tarjetas Base (`.c-card`)
* Fondo: `#FFFFFF`, borde `1px solid #C6CFD7`, radio `8px` (o `16px` para cards principales).
* Sombra base: `0 2px 4px rgba(0,0,0,0.04)`.
* **Efecto Hover (estilo ANZSOG)**:
  ```css
  .c-card--interactive {
    transition: transform var(--duration-hover) var(--ease-in-out-quad),
                box-shadow var(--duration-hover) var(--ease-in-out-quad);
  }
  .c-card--interactive:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px -6px rgba(15, 132, 143, 0.12); /* Sombra con tinte teal sutil */
  }
  ```

### 4.4 Pills / Badges de Categoría (`.c-badge`)
Radio de píldora (`16px` o `64px`), tipografía `Roboto` 12px, mayúsculas con tracking:
* `.c-badge--teal`: Fondo `#E6F3F4`, texto `#0F848F`.
* `.c-badge--green`: Fondo `#E7F8EF`, texto `#278B52` (Voluntariado / Ambiental).
* `.c-badge--orange`: Fondo `#FFF3E0`, texto `#F97316` (Capacitación / Eventos).
* `.c-badge--blue`: Fondo `#E0F2FE`, texto `#0EA5E9` (Institucional / Acreditación).

### 4.5 Subrayado Animado en Enlaces (`.c-link-animated`)
Al pasar el cursor, el subrayado crece de izquierda a derecha de 0% a 100% en `0.25s ease-in-out`:
```css
.c-link-animated {
  position: relative;
  text-decoration: none;
  color: inherit;
}
.c-link-animated::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary-teal, #0F848F);
  transition: width 0.25s ease-in-out;
}
.c-link-animated:hover::after {
  width: 100%;
}
```

---

## 5. Desglose Exhaustivo de Secciones del Home (RSU)

A continuación se detalla la especificación para cada módulo según el Brief institucional y la réplica UX de ANZSOG:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. HEADER & MEGA MENÚ (Sticky, blur, clip-path curtain, accesibilidad)  │
├────────────────────────────────────────────────────────────────────────┤
│ 2. HERO BANNER (H1 con énfasis, foto banner, parallax capas, 4 CTAs)   │
├────────────────────────────────────────────────────────────────────────┤
│ 3. PRESENTACIÓN E INICIATIVAS (Intro RSU + 4 tarjetas de acceso rápido)│
├────────────────────────────────────────────────────────────────────────┤
│ 4. HUELLA WIENER (Impacto en cifras desde 2024: contador dinámico)     │
├────────────────────────────────────────────────────────────────────────┤
│ 5. NUESTRO MODELO RSU (4 Pilares: Gestión, Formación, Proyección, I+D) │
├────────────────────────────────────────────────────────────────────────┤
│ 6. PROYECTOS EMBLEMÁTICOS (Carrusel Swiper interactivo + progressbar)   │
├────────────────────────────────────────────────────────────────────────┤
│ 7. CAMPUS SOSTENIBLE Y VOLUNTARIADO (Grid interactivo con filtros)     │
├────────────────────────────────────────────────────────────────────────┤
│ 8. SEMANA DE LA SOSTENIBILIDAD (Showcase con video / panel de expertos)│
├────────────────────────────────────────────────────────────────────────┤
│ 9. RECONOCIMIENTOS OBTENIDOS (ODS, Metared S, Huella Carbono MINAM)   │
├────────────────────────────────────────────────────────────────────────┤
│ 10. ALIADOS ESTRATÉGICOS (Carrusel continuo infinito / Ticker logos)   │
├────────────────────────────────────────────────────────────────────────┤
│ 11. NOTICIAS Y PRENSA (Notas oficiales RSU, cards con etiquetas)       │
├────────────────────────────────────────────────────────────────────────┤
│ 12. FOOTER INSTITUCIONAL (Directorio, políticas, acreditaciones)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Sección 1: Header y Mega Menú
* **Archivos**: `sections/header/header.html`, `header.css`, `header.js`.
* **Contenido (Brief)**:
  * Logo de la Universidad Norbert Wiener + isotipo RSU.
  * Menú de navegación principal: `Home`, `Quiénes somos`, `Proyectos`, `Voluntariado`, `Campus sostenible`, `Semana de la Sostenibilidad`, `Noticias`.
  * Acceso directo o botón CTA "Participar / Contáctanos".
* **Estilo visual (`Design.md`)**:
  * Fondo blanco translúcido (`rgba(255, 255, 255, 0.96)`) con `backdrop-filter: blur(10px)`.
  * Altura desktop: `80px` (se compacta a `64px` tras hacer scroll >80px).
  * Borde inferior sutil: `1px solid rgba(198, 207, 215, 0.6)`.
* **Animaciones & Transiciones (ANZSOG)**:
  * **Mega Menú Dropdown**: Cortina con `clip-path: inset(0 0 100% 0)` a `clip-path: inset(0 0 0% 0)`. Duración: `0.4s` con `--ease-out-quart`.
  * **Ítems del menú desplegable**: Entran en cascada con `opacity: 0; transform: translateY(1rem)` y un retardo de `calc(var(--index) * 75ms)`.
  * **Comportamiento Sticky Inteligente**: Al hacer scroll hacia abajo se oculta suavemente (`translateY(-100%)`); al hacer scroll hacia arriba reaparece inmediatamente.
* **Interactividad (JS)**:
  * Control de hover con retardo de gracia (150ms) para evitar parpadeos diagonales.
  * Soporte completo de teclado (`Tab`, `Enter`, `Escape`) con trampa de foco y atributos `aria-expanded`.
  * Drawer móvil desplegable desde la derecha con animación `transform: translateX(0)`.

---

### Sección 2: Hero Banner
* **Archivos**: `sections/hero/hero.html`, `hero.css`, `hero.js`.
* **Contenido (Brief 8.1)**:
  * Título institucional sobrepuesto: **Responsabilidad Social** con subtítulo enfatizado: **Impulsando líderes socialmente responsables**.
  * Breve texto institucional: *"En la Universidad Norbert Wiener impulsamos el impacto académico, social y ambiental sostenible..."*
  * 2 Botones de acción: "Conoce nuestros proyectos" (Primary Teal) y "Ver logros e impacto" (Outline).
* **Estilo visual**:
  * Altura mínima: `85vh` (desktop) con contenedor central `max-width: 1280px`.
  * Capa de fondo fotográfica de alta resolución con estudiantes/comunidad y gradiente de legibilidad en teal oscuro (`linear-gradient(90deg, rgba(15, 132, 143, 0.92) 0%, rgba(34, 34, 34, 0.6) 100%)`).
* **Animaciones & Transiciones (ANZSOG)**:
  * **Entrada del H1**: `translateY(24px) -> 0` y `opacity: 0 -> 1` con duración `0.9s` (`--duration-hero`) y `--ease-out-quad`.
  * **Parallax de profundidad**: Movimiento suave de la imagen de fondo a velocidad `0.15x` respecto al scroll de Lenis.
  * **Botón CTA primario**: Pseudo-elemento `::before` que se expande horizontalmente en hover en `0.25s`.

---

### Sección 3: Presentación e Iniciativas de RSU
* **Archivos**: `sections/iniciativas/iniciativas.html`, `iniciativas.css`, `iniciativas.js`.
* **Contenido (Brief 8.1)**:
  * Eyebrow: `LÍNEAS DE ACCIÓN`.
  * H2: **Nuestras Principales Iniciativas: <span class="c-text-emphasis">Compromiso y Acción</span>**.
  * 4 Tarjetas de acceso rápido con enlace derivado a su respectiva sección:
    1. *Proyectos emblemáticos interdisciplinarios* (Botón "Ver más" → deriva a Proyectos).
    2. *Proyectos de programas académicos* (Botón "Ver más" → deriva a Proyectos).
    3. *Voluntariado Wiener* (Botón "Ver más" → deriva a Voluntariado).
    4. *Campus Sostenible* (Botón "Ver más" → deriva a Campus).
* **Estilo visual**:
  * Grid de 4 columnas en desktop (`repeat(4, 1fr)`), 2 en tablet, 1 en móvil.
  * Tarjetas blancas (`.c-card--interactive`) con icono SVG temático, borde `#C6CFD7` y botón `.c-btn--outline` o enlace animado con flecha.
* **Animaciones**:
  * Revelado con `.c-transition-in` escalonado (`--transition-delay: 0.1s, 0.2s, 0.3s, 0.4s`).
  * Hover en card: Elevación de `-8px` y sombra suave teal en `0.3s`.

---

### Sección 4: Huella Wiener - Resultados que Transforman Vidas
* **Archivos**: `sections/huella-wiener/huella-wiener.html`, `huella-wiener.css`, `huella-wiener.js`.
* **Contenido (Brief 8.1)**:
  * H2: **Huella Wiener: <span class="c-text-emphasis">Resultados que transforman vidas</span>**.
  * Texto explicativo: *"Nuestros resultados reflejan el compromiso de estudiantes, docentes y colaboradores que llevan su profesión al servicio de las comunidades. Nuestro impacto en cifras desde el 2024:"*
  * 4 Contadores numéricos masivos:
    * **102,141** Beneficiarios
    * **42,729** Participantes UNW
    * **330,686** Atenciones de salud y asesoría
    * **2,788** Árboles plantados
* **Estilo visual**:
  * Fondo contrastante institucional (Slate oscuro `#1E293B` o `#222222` con acentos en `#0F848F`).
  * Cifras en fuente `Lato` 900, tamaño `48px` a `56px`, color blanco o teal claro `#09A5B1`.
* **Animaciones & Interactividad (JS)**:
  * **Contador animado de 0 al valor objetivo**: Se ejecuta en `1500ms` usando una función de interpolación `easeOutQuad` cuando el usuario hace scroll y la sección entra al viewport (`IntersectionObserver`).
  * Con `prefers-reduced-motion`: Muestra el valor numérico formateado directamente sin animación.

---

### Sección 5: Nuestro Modelo RSU (Los 4 Pilares)
* **Archivos**: `sections/modelo-rsu/modelo-rsu.html`, `modelo-rsu.css`, `modelo-rsu.js`.
* **Contenido (Brief 8.2)**:
  * Eyebrow: `QUIÉNES SOMOS & GESTIÓN ÉTICA`.
  * H2: **Nuestro Modelo RSU: <span class="c-text-emphasis">Cuatro Pilares Estratégicos</span>**.
  * Cuadrantes interactivos con fotografía y descripción:
    1. **Gestión Institucional**: Ecoeficiencia, preservación del entorno y campus inclusivo (+ foto campaña ecoeficiencia).
    2. **Formación Ético-Ciudadana**: Inserción de RSU en el currículo y proyectos resolutivos en aula (+ foto proyecto negocios).
    3. **Proyección Social**: Vínculos colaborativos con comunidades vulnerables y voluntariado (+ foto Bienestar en mi barrio).
    4. **Investigación con Enfoque RSU**: Fomento de investigación formativa y fondos concursables (+ foto fondo concursable).
  * Acceso directo a descarga de políticas: *Política de Responsabilidad Social* y *Política de Protección del Medio Ambiente*.
* **Estilo visual**:
  * Layout en rejilla de 4 cuadrantes (2x2 en desktop, 1 columna en móvil) con imagen integrada y overlay elegante.
* **Animaciones**:
  * Al hacer hover, la imagen de fondo realiza un suave `transform: scale(1.04)` en `0.6s ease-out` contenido dentro de `overflow: hidden`.
  * El texto y el badge suben ligeramente (`translateY(-4px)`).

---

### Sección 6: Proyectos Emblemáticos
* **Archivos**: `sections/proyectos-emblematicos/proyectos-emblematicos.html`, `proyectos-emblematicos.css`, `proyectos-emblematicos.js`.
* **Contenido (Brief 8.3)**:
  * H2: **Proyectos Emblemáticos: <span class="c-text-emphasis">Impacto Multidisciplinario y Sostenible</span>**.
  * Carrusel de proyectos con etiquetas de ODS, fotos, descripción y CTA:
    * **Proyecto Bienestar en mi barrio**: Promoción de salud, prevención y campañas comunitarias.
    * **Proyecto Escuela de Mujeres Emprendedoras**: Capacitación integral a mujeres en gestión de negocios duraderos.
    * **Proyecto Consultorio Jurídico**: Asesoría legal gratuita y educación en derechos a poblaciones vulnerables.
    * **Iniciativas Académicas destacadas**: *Obstetras sin Fronteras*, *Eco acción*, *Nutrición que transforma (Ollas comunes)*, *Clínica Jurídica*, *Salud bucal comunitaria*.
* **Estilo visual**:
  * Carrusel Swiper v11 con tarjetas de altura homogénea (`h-full`), etiqueta ODS en la parte superior, galería de 2 fotos por proyecto y metadatos con iconos.
* **Animaciones & Slider (ANZSOG)**:
  * Swiper con `speed: 300` y curva `cubic-bezier(0.25, 0.1, 0.25, 1)`.
  * **Barra de Progreso Continua**: `.swiper-pagination-progressbar` con altura de `2px` y relleno en color Teal `#0F848F`.
  * Botones de navegación circulares (izq/der) con feedback de hover en `0.2s`.

---

### Sección 7: Campus Sostenible y Voluntariado
* **Archivos**: `sections/campus-voluntariado/campus-voluntariado.html`, `campus-voluntariado.css`, `campus-voluntariado.js`.
* **Contenido (Brief 8.4 y 8.5)**:
  * H2: **Campus Sostenible & Voluntariado: <span class="c-text-emphasis">Acción Universitaria en Marcha</span>**.
  * Selector por pestañas interactivas (Tabs):
    * **Pestaña 1: Campus Sostenible**: Campañas *Ecoeficientes*, *Yo segrego*, *Inclusión y no discriminación*, *Universidad Libre de Humo*, *Movilidad Biciwiener*, *Talks de sostenibilidad*, *Cálculo de Huella de Carbono (1 estrella MINAM)*.
    * **Pestaña 2: Voluntariado Wiener**: Voluntariado *Educativo (reforzamiento escolar)*, *Intercambio cultural (traductores en inglés)*, *Ambiental (limpieza de playas/arborización)*, *Salud*, y la *Brigada Ambiental Wiener*.
* **Estilo visual**:
  * Navegación de pestañas tipo píldora (`.c-tabs`). Pestaña activa con fondo Teal `#0F848F` y texto blanco.
  * Cuadrícula de tarjetas con fotos de las campañas.
* **Interactividad & Animación (JS)**:
  * Cambio de pestaña sin recarga con fade suave (`opacity: 0 -> 1`, `duration: 250ms`).
  * Cada tarjeta cuenta con su badge de temática (Verde: Ambiental, Azul: Salud, Naranja: Educativo).

---

### Sección 8: Semana de la Sostenibilidad
* **Archivos**: `sections/semana-sostenibilidad/semana-sostenibilidad.html`, `semana-sostenibilidad.css`, `semana-sostenibilidad.js`.
* **Contenido (Brief 8.6)**:
  * H2: **Semana de la Sostenibilidad: <span class="c-text-emphasis">Conciencia, Ética e Integración</span>**.
  * Descripción: *"Espacio académico y de integración que concientiza a nuestra comunidad universitaria sobre acciones sostenibles..."*
  * Contenedor para Video institucional de la Semana de la Sostenibilidad (con modal lightbox accesible o reproductor nativo).
  * 4 Actividades destacadas con pie de foto explicativo:
    1. *Panel de expertos* ("Líderes referentes en sostenibilidad").
    2. *Feria de proyectos* ("Presentación de iniciativas UNW y aliados públicos/privados").
    3. *Escuela de Manejo de bicicletas: Biciwiener* ("Aprendiendo sobre normas de tránsito").
    4. *Conferencias internacionales* ("Perspectivas globales sobre sostenibilidad").
* **Animaciones**:
  * Entrada del bloque de video con clip-path suave o escala sutil.
  * Tarjetas de actividades con elevación en hover y zoom de imagen.

---

### Sección 9: Reconocimientos Obtenidos
* **Archivos**: `sections/reconocimientos/reconocimientos.html`, `reconocimientos.css`, `reconocimientos.js`.
* **Contenido (Brief 8.1)**:
  * H2: **Logros que nos Respaldan: <span class="c-text-emphasis">Reconocimientos y Acreditaciones</span>**.
  * Galería de distintivos oficiales:
    1. **Perú por los ODS**: Reconocimiento Categoría Personas por Centro Odontológico Wiener.
    2. **Empresas que Transforman el País**: Por el Centro Odontológico y Proyecto Terapia.
    3. **Sello Compromiso Metared S**: Red de sostenibilidad universitaria iberoamericana.
    4. **Huella de Carbono Perú - MINAM**: Certificación oficial de 1era estrella.
    5. **Premio Metropolitano al Voluntariado**: Categoría Lima Verde.
* **Estilo visual**:
  * Tarjetas con fondo blanco `#FFFFFF`, marco `#C6CFD7`, logotipo en alta resolución del premio, badge de año/categoría y breve descripción de impacto.
* **Animaciones**:
  * Reveal escalonado en cuadrícula de 5 columnas (o carrusel responsivo en tablet/móvil).

---

### Sección 10: Aliados Estratégicos (Logo Marquee / Ticker Infinito)
* **Archivos**: `sections/aliados/aliados.html`, `aliados.css`, `aliados.js`.
* **Contenido (Brief 8.1)**:
  * H3 / Eyebrow: `RED DE ALIANZAS ESTRATÉGICAS`.
  * Logos interactivos con desplazamiento continuo de izquierda a derecha:
    * *Fundación Romero, Municipalidad de Lince, Municipalidad de Independencia, Municipalidad de Lima, Entel, Caja Arequipa, Asociación María Inés y Herman, Voluntariado del Congreso, Cruz Blanca, Fundación Peruana de Cáncer, MIMP, MINSA, Hombro a Hombro*.
* **Implementación CSS (Zero JavaScript overhead)**:
  * Marquee infinito por CSS usando `keyframes` y `transform: translateX(...)` acelerado por GPU:
  ```css
  @keyframes marqueeLeft {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-50%, 0, 0); }
  }
  .c-marquee__track {
    display: flex;
    width: max-content;
    animation: marqueeLeft 30s linear infinite;
  }
  .c-marquee:hover .c-marquee__track {
    animation-play-state: paused; /* Se pausa al poner el cursor encima */
  }
  ```
  * En hover: el logo pasa de escala de grises al color original (`filter: grayscale(100%) -> grayscale(0%)` en `0.25s`).

---

### Sección 11: Noticias y Prensa RSU
* **Archivos**: `sections/noticias/noticias.html`, `noticias.css`, `noticias.js`.
* **Contenido (Brief 8.7)**:
  * H2: **Actualidad RSU: <span class="c-text-emphasis">Noticias y Vocería Institucional</span>**.
  * Filtros por etiquetas: `Todas`, `Voluntariado`, `Proyectos`, `Reconocimientos`, `Eventos`.
  * Tarjetas de noticias tomadas de las notas de prensa oficiales de UNW:
    * Voluntarios UNW en campaña con Congreso e INABIF.
    * Reconocimiento Perú por los ODS 2026 a Centro Odontológico.
    * Taller a mujeres emprendedoras de Lince y Consultorio Jurídico.
    * Sello de sostenibilidad Metared S.
    * Jornada de arborización con Municipalidad de La Victoria.
  * Cada tarjeta incluye: Foto, Fecha, Badge temático, Título h3, Extracto y enlace "Leer nota completa →".
* **Estilo visual**:
  * Carrusel Swiper en desktop (3.25 slides visibles) con opción de botón "Ver todas las noticias".

---

### Sección 12: Footer Institucional
* **Archivos**: `sections/footer/footer.html`, `footer.css`, `footer.js`.
* **Contenido (Brief y Design.md)**:
  * Logotipo de la Universidad Norbert Wiener + isotipo Dirección de Responsabilidad Social.
  * Columna 1: Dirección institucional, contacto, email de RSU y enlace a mesa de ayuda.
  * Columna 2: Enlaces rápidos a secciones del sitio (Modelo RSU, Proyectos, Voluntariado, Campus).
  * Columna 3: Documentos normativos (Política de RSU, Política de Protección Ambiental, Código de Ética).
  * Columna 4: Acreditaciones nacionales e internacionales y logos de certificación institucional.
  * Cintillo inferior: Copyright, Políticas de Privacidad y botón accesible "Volver arriba" (`scroll-to-top`).
* **Animaciones**:
  * Enlaces con subrayado animado `.c-link-animated`.
  * Botón flotante `scroll-to-top` que aparece suavemente (`opacity: 0 -> 1`) tras superar los 600px de scroll.

---

## 6. Estrategia de Reutilización y Optimización de Tokens LLM

Al construir las secciones paso a paso, los agentes de código y desarrolladores deben seguir estas **reglas de oro de token economy**:

1. **No repetir variables CSS ni clases maestras**: Toda propiedad común (`color`, `font-family`, `border-radius`, `transition`) debe consumirse desde `var(--nombre-token)`. NUNCA redeclarar estilos de `.c-btn`, `.c-card`, `.c-section-heading` o `.c-badge` dentro de los archivos `sections/*.css`.
2. **Archivos de sección ultra-enfocados**:
   * `[seccion].html`: Debe contener estrictamente el `<section id="...">` con la estructura semántica limpia.
   * `[seccion].css`: Debe contener únicamente las reglas de diagramación/layout específicas de esa sección (p. ej. `display: grid; grid-template-columns: ...;`).
   * `[seccion].js`: Debe contener exclusivamente la lógica propia de esa sección (p. ej. inicializar el Swiper local o el contador numérico), exportada como función `init[Seccion]()`.
3. **Control de imports en `index.html`**:
   * En el `<head>` se cargan `variables.css`, `reset.css`, `components.css`, `global.css` y las hojas de cada sección (`<link rel="stylesheet" href="sections/.../...css">`).
   * Al final del `<body>` se incluye `main.js` como módulo ES6 (`<script type="module" src="assets/js/main.js"></script>`), el cual importa e inicializa cada submódulo.

---

## 7. Hoja de Ruta de Construcción por Fases de Validación

Siga este orden riguroso para construir el proyecto:

* **Fase 1: Fundaciones y Componentes Globales**
  * Crear `assets/css/variables.css` con los tokens de color de `Design.md` y motion de ANZSOG.
  * Crear `assets/css/reset.css`, `components.css` y `global.css`.
  * Configurar `assets/js/lenis-init.js` y `assets/js/scroll-observer.js`.
  * Validar la respuesta del scroll inercial y las clases base en navegador.

* **Fase 2: Estructura del Header y Banner de Entrada**
  * Construir `sections/header/` (Header sticky, mega menú con clip-path y drawer móvil).
  * Construir `sections/hero/` (H1 con énfasis, foto banner, botones CTA y parallax).
  * Validar apertura de menú, accesibilidad de teclado y transiciones en `0.4s`.

* **Fase 3: Bloques Institucionales y Métricas de Impacto**
  * Construir `sections/iniciativas/` (Tarjetas de líneas de acción con stagger de 100ms).
  * Construir `sections/huella-wiener/` (Contador interactivo de 102k beneficiarios y árboles plantados).
  * Construir `sections/modelo-rsu/` (Cuadrantes de los 4 pilares y descarga de políticas).
  * Validar activación de contadores vía `IntersectionObserver`.

* **Fase 4: Carruseles y Showcase de Actividades**
  * Construir `sections/proyectos-emblematicos/` (Swiper v11 con progressbar de 2px en Teal).
  * Construir `sections/campus-voluntariado/` (Tabs interactivas y tarjetas de brigadas/campañas).
  * Construir `sections/semana-sostenibilidad/` (Galería de actividades y bloque de video).
  * Construir `sections/reconocimientos/` (Cards institucionales de premios ODS y Metared).
  * Validar respuesta táctil (swipe), navegación por teclado y pausas en hover.

* **Fase 5: Alianzas, Actualidad y Cierre**
  * Construir `sections/aliados/` (Marquee continuo infinito en CSS con pausa en hover).
  * Construir `sections/noticias/` (Carrusel y grid de notas de prensa oficiales de UNW).
  * Construir `sections/footer/` (Directorio, normativas y botón scroll-to-top).
  * Ensamblar y validar en `index.html` con auditoría Lighthouse (Performance ≥ 95, Accessibility ≥ 95).
