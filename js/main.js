'use strict';

/* ========================================
   Sprint Judicial — Main Application
   ======================================== */

const SprintJudicial = (() => {

  // --- Constants ---
  const SCROLL_THRESHOLD = 50;
  const ANIMATION_DURATION = 2000;
  const OBSERVER_THRESHOLD = 0.15;
  const COUNTER_FPS = 60;

  // --- State (Singleton) ---
  const state = {
    menuOpen: false,
    scrolled: false,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    countersAnimated: false
  };

  // --- Helpers ---

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function $(selector, context) {
    return (context || document).querySelector(selector);
  }

  function $$(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
  }

  // --- Navbar ---

  function initNavbar() {
    const navbar = $('.navbar');
    const toggle = $('.navbar__toggle');
    const links = $('.navbar__links');

    if (!navbar || !toggle || !links) return;

    // Toggle mobile menu
    function openMenu() {
      state.menuOpen = true;
      links.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      state.menuOpen = false;
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (state.menuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.menuOpen) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on nav link click
    $$('.navbar__link, .navbar__cta', links).forEach(function (link) {
      link.addEventListener('click', function () {
        if (state.menuOpen) {
          closeMenu();
        }
      });
    });

    // Close on outside click (clicking the overlay area)
    links.addEventListener('click', function (e) {
      if (e.target === links && state.menuOpen) {
        closeMenu();
      }
    });

    // Scroll detection for navbar background
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          const isScrolled = window.scrollY > SCROLL_THRESHOLD;
          if (isScrolled !== state.scrolled) {
            state.scrolled = isScrolled;
            navbar.classList.toggle('navbar--scrolled', isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Scroll Animations (IntersectionObserver) ---

  function initScrollAnimations() {
    if (state.prefersReducedMotion) {
      // Make everything visible immediately
      $$('[data-animate]').forEach(function (el) {
        el.classList.add('reveal--visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: OBSERVER_THRESHOLD,
      rootMargin: '0px 0px -50px 0px'
    });

    $$('[data-animate]').forEach(function (el) {
      el.classList.add('reveal');
      if (el.hasAttribute('data-stagger')) {
        el.classList.add('reveal--stagger');
      }
      observer.observe(el);
    });
  }

  // --- Counter Animation ---

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count-target'), 10);
    if (isNaN(target)) return;

    const startTime = performance.now();
    const suffix = el.getAttribute('data-count-suffix') || '';
    const prefix = el.getAttribute('data-count-prefix') || '';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
      const easedProgress = easeOutQuad(progress);
      const currentValue = Math.round(easedProgress * target);

      el.textContent = prefix + currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counterElements = $$('[data-count-target]');
    if (counterElements.length === 0) return;

    if (state.prefersReducedMotion) {
      counterElements.forEach(function (el) {
        const target = el.getAttribute('data-count-target');
        const suffix = el.getAttribute('data-count-suffix') || '';
        const prefix = el.getAttribute('data-count-prefix') || '';
        el.textContent = prefix + target + suffix;
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counterElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Smooth Scroll ---

  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = $(href);
        if (!target) return;

        e.preventDefault();
        const navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
          10
        ) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });

        // Update URL without jump
        history.pushState(null, '', href);
      });
    });
  }

  // --- Scroll Indicator ---

  function initScrollIndicator() {
    const indicator = $('.hero__scroll-indicator');
    if (!indicator) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          const opacity = Math.max(0, 1 - window.scrollY / 300);
          indicator.style.opacity = opacity;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Public API ---

  return {
    init: function () {
      initNavbar();
      initScrollAnimations();
      initCounters();
      initSmoothScroll();
      initScrollIndicator();
    }
  };

})();

document.addEventListener('DOMContentLoaded', SprintJudicial.init);
