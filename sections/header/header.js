/**
 * HEADER & MEGA MENÚ - CONTROLADOR JAVASCRIPT
 * Proyecto: Web RSU - Universidad Norbert Wiener
 * Características: Smart scroll, hover intent con tolerancia, teclado accesible y drawer móvil
 */

export function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const dropdownItems = header.querySelectorAll('.has-dropdown');
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-navigation');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileAccordions = document.querySelectorAll('.c-mobile-accordion');

  let lastScrollY = window.scrollY;
  let isScrolling = false;
  let openDropdownTimer = null;
  let closeDropdownTimer = null;
  const HOVER_INTENT_DELAY = 80;  // 80ms antes de abrir
  const GRACE_CLOSE_DELAY = 150;  // 150ms de tolerancia al salir

  /* ==========================================================================
     1. SMART SCROLL (Ocultar al bajar / Mostrar al subir / Compactar)
     ========================================================================== */
  function updateHeaderOffset(isHidden) {
    const headerHeight = header.offsetHeight || 68;
    document.documentElement.style.setProperty(
      '--header-visible-offset',
      isHidden ? '0px' : `${headerHeight}px`
    );
  }

  // Inicializar offset visible para elementos sticky dependientes (como filtros móviles)
  updateHeaderOffset(false);

  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Compactar altura al hacer scroll > 40px
    if (currentScrollY > 40) {
      header.classList.add('c-header--scrolled');
    } else {
      header.classList.remove('c-header--scrolled');
    }

    // Comprobar si hay algún dropdown abierto
    const hasOpenDropdown = header.querySelector('.has-dropdown.is-open');
    const isMobileNavOpen = mobileNav && mobileNav.classList.contains('is-open');

    // Solo ocultar si no hay menús abiertos
    if (!hasOpenDropdown && !isMobileNavOpen) {
      if (currentScrollY > 80 && currentScrollY > lastScrollY) {
        // Scroll hacia abajo -> ocultar
        if (!header.classList.contains('c-header--hidden')) {
          header.classList.add('c-header--hidden');
          updateHeaderOffset(true);
        }
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba -> mostrar
        if (header.classList.contains('c-header--hidden')) {
          header.classList.remove('c-header--hidden');
          updateHeaderOffset(false);
        }
      }
    }

    lastScrollY = Math.max(0, currentScrollY);
    isScrolling = false;
  }

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(handleScroll);
      isScrolling = true;
    }
  }, { passive: true });

  /* ==========================================================================
     2. GESTIÓN DE DESPLEGABLES & MEGA MENÚ (DESKTOP)
     ========================================================================== */
  function openDropdown(item) {
    clearTimeout(closeDropdownTimer);
    clearTimeout(openDropdownTimer);

    // Cerrar otros desplegables abiertos
    dropdownItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('is-open')) {
        closeDropdown(otherItem, 0);
      }
    });

    item.classList.add('is-open');
    const trigger = item.querySelector('.c-nav__trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown(item, delay = GRACE_CLOSE_DELAY) {
    clearTimeout(openDropdownTimer);
    clearTimeout(closeDropdownTimer);

    closeDropdownTimer = setTimeout(() => {
      item.classList.remove('is-open');
      const trigger = item.querySelector('.c-nav__trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }, delay);
  }

  function closeAllDropdowns() {
    clearTimeout(openDropdownTimer);
    clearTimeout(closeDropdownTimer);
    dropdownItems.forEach(item => {
      item.classList.remove('is-open');
      const trigger = item.querySelector('.c-nav__trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  dropdownItems.forEach(item => {
    const trigger = item.querySelector('.c-nav__trigger');
    const pane = item.querySelector('.c-dropdown-pane');

    // Hover Intent en Desktop (>1024px)
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        clearTimeout(closeDropdownTimer);
        openDropdownTimer = setTimeout(() => {
          openDropdown(item);
        }, HOVER_INTENT_DELAY);
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) {
        closeDropdown(item, GRACE_CLOSE_DELAY);
      }
    });

    // Accesibilidad por Teclado / Clic
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        const href = trigger.getAttribute('href');
        // Si el elemento padre tiene un href válido, permitir la navegación a la página/sección
        if (href && href !== '#' && !href.startsWith('javascript:')) {
          return;
        }

        e.preventDefault();
        const isOpen = item.classList.contains('is-open');
        if (isOpen) {
          closeDropdown(item, 0);
        } else {
          openDropdown(item);
        }
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDropdown(item, 0);
          trigger.focus();
        }
      });
    }

    if (pane) {
      pane.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDropdown(item, 0);
          if (trigger) trigger.focus();
        }
      });
    }
  });

  // Cerrar al hacer clic fuera del header
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      closeAllDropdowns();
    }
  });

  /* ==========================================================================
     3. CAJÓN DE NAVEGACIÓN MOBILE (DRAWER & ACCORDIONS)
     ========================================================================== */
  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.removeAttribute('hidden');
    // Forzar reflow para animación fluida
    void mobileNav.offsetWidth;
    mobileNav.classList.add('is-open');
    if (navToggle) {
      navToggle.classList.add('is-active');
      navToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden'; // Bloqueo de scroll
  }

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    if (navToggle) {
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = ''; // Restaurar scroll
    setTimeout(() => {
      if (!mobileNav.classList.contains('is-open')) {
        mobileNav.setAttribute('hidden', '');
      }
    }, 350);
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav && mobileNav.classList.contains('is-open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  // Acordeones dentro del Drawer Mobile
  mobileAccordions.forEach(accordion => {
    const trigger = accordion.querySelector('.c-mobile-accordion__trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = accordion.classList.contains('is-open');
        // Cerrar otros acordeones
        mobileAccordions.forEach(other => {
          if (other !== accordion) {
            other.classList.remove('is-open');
            const otherTrigger = other.querySelector('.c-mobile-accordion__trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          accordion.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          accordion.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Cerrar Drawer al hacer clic en enlaces internos de navegación (#...)
  if (mobileNav) {
    const internalLinks = mobileNav.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });
  }

  // Tecla Escape para cerrar Drawer Mobile
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileNav && mobileNav.classList.contains('is-open')) {
        closeMobileNav();
        if (navToggle) navToggle.focus();
      } else {
        closeAllDropdowns();
      }
    }
  });
}
