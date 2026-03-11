'use strict';

/* ========================================
   Sprint Judicial — Main Application
   ======================================== */

const SprintJudicial = (() => {

  // --- Constants ---
  const SCROLL_THRESHOLD = 50;
  const ANIMATION_DURATION = 2000;
  const OBSERVER_THRESHOLD = 0.15;

  // --- State (Singleton) ---
  const state = {
    menuOpen: false,
    scrolled: false,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
      navbar.classList.add('navbar--menu-open');
      links.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      state.menuOpen = false;
      navbar.classList.remove('navbar--menu-open');
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

    // Focus trap for mobile menu
    function handleFocusTrap(e) {
      if (!state.menuOpen || e.key !== 'Tab') return;

      var focusableElements = links.querySelectorAll('a, button');
      var focusable = [toggle].concat(Array.from(focusableElements));
      var firstFocusable = focusable[0];
      var lastFocusable = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }

    document.addEventListener('keydown', handleFocusTrap);

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
    var indicator = $('.hero__scroll-indicator');
    if (!indicator) return null;
    return indicator;
  }

  // --- Unified Scroll Handler ---

  function initUnifiedScroll() {
    var navbar = $('.navbar');
    var indicator = initScrollIndicator();
    var backToTop = $('.back-to-top');
    var ticking = false;

    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var scrollY = window.scrollY;

          // Navbar scroll state
          if (navbar) {
            var isScrolled = scrollY > SCROLL_THRESHOLD;
            if (isScrolled !== state.scrolled) {
              state.scrolled = isScrolled;
              navbar.classList.toggle('navbar--scrolled', isScrolled);
            }
          }

          // Scroll indicator fade
          if (indicator) {
            indicator.style.opacity = Math.max(0, 1 - scrollY / 300);
          }

          // Back to top visibility
          if (backToTop) {
            backToTop.classList.toggle('is-visible', scrollY > 500);
          }

          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Active Nav Tracking ---

  function initActiveNav() {
    var navLinks = $$('.navbar__link[href^="#"]');
    if (navLinks.length === 0) return;

    var sections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) {
        sections.push({ el: section, link: link });
      }
    });

    if (sections.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          var match = sections.find(function (s) { return s.el === entry.target; });
          if (match) {
            match.link.classList.add('is-active');
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(function (s) { observer.observe(s.el); });
  }

  // --- Resize Handler ---

  function initResizeHandler() {
    var toggle = $('.navbar__toggle');
    var links = $('.navbar__links');

    if (!toggle || !links) return;

    var mql = window.matchMedia('(min-width: 768px)');

    function handleResize() {
      if (mql.matches && state.menuOpen) {
        state.menuOpen = false;
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        document.querySelector('.navbar').classList.remove('navbar--menu-open');
      }
    }

    mql.addEventListener('change', handleResize);
  }

  // --- Blog Feed ---

  function initBlogFeed() {
    var grid = document.getElementById('blog-feed');
    var fallback = document.getElementById('blog-fallback');
    if (!grid) return;

    var BLOG_RSS = 'https://blog.sprintjudicial.com/index.xml';
    var MAX_POSTS = 3;

    var controller = new AbortController();
    var timeoutId = setTimeout(function () { controller.abort(); }, 8000);

    fetch(BLOG_RSS, { signal: controller.signal })
      .then(function (res) {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('RSS fetch failed');
        return res.text();
      })
      .then(function (text) {
        var parser = new DOMParser();
        var xml = parser.parseFromString(text, 'text/xml');
        var items = xml.querySelectorAll('item');

        if (items.length === 0) throw new Error('No items');

        var count = 0;
        var fragment = document.createDocumentFragment();

        items.forEach(function (item) {
          if (count >= MAX_POSTS) return;

          var itemTitle = item.querySelector('title');
          var itemLink = item.querySelector('link');
          var description = item.querySelector('description');
          var pubDate = item.querySelector('pubDate');

          if (!itemTitle || !itemLink) return;

          var titleText = itemTitle.textContent;
          var linkText = itemLink.textContent;

          // Skip non-article pages
          if (titleText === 'Archives' || titleText === 'Tags') return;

          var excerptText = '';
          if (description) {
            var tmp = document.createElement('div');
            tmp.textContent = description.textContent;
            var plainText = tmp.textContent.substring(0, 150);
            if (tmp.textContent.length > 150) plainText += '\u2026';
            excerptText = plainText;
          }

          var dateStr = '';
          if (pubDate) {
            var d = new Date(pubDate.textContent);
            if (!isNaN(d)) {
              dateStr = d.toLocaleDateString('es-CO', {
                year: 'numeric', month: 'long', day: 'numeric'
              });
            }
          }

          var card = document.createElement('a');
          card.href = linkText;
          card.className = 'blog__card';
          card.target = '_blank';
          card.rel = 'noopener noreferrer';

          if (dateStr) {
            var dateSpan = document.createElement('span');
            dateSpan.className = 'blog__card-date';
            dateSpan.textContent = dateStr;
            card.appendChild(dateSpan);
          }

          var titleEl = document.createElement('h3');
          titleEl.className = 'blog__card-title';
          titleEl.textContent = titleText;
          card.appendChild(titleEl);

          if (excerptText) {
            var excerptEl = document.createElement('p');
            excerptEl.className = 'blog__card-excerpt';
            excerptEl.textContent = excerptText;
            card.appendChild(excerptEl);
          }

          var readMore = document.createElement('span');
          readMore.className = 'blog__card-link';
          readMore.textContent = 'Leer m\u00E1s \u2192';
          card.appendChild(readMore);

          fragment.appendChild(card);
          count++;
        });

        if (count > 0) {
          grid.textContent = '';
          grid.appendChild(fragment);
          if (fallback) fallback.style.display = 'none';
        }
      })
      .catch(function () {
        // CORS or network error: show fallback link
        grid.style.display = 'none';
      });
  }

  // --- Hero Rotator ---

  function initHeroRotator() {
    var container = $('.hero__rotator');
    if (!container) return;

    var items = $$('.hero__rotator-item', container);
    if (items.length < 2) return;

    if (state.prefersReducedMotion) return;

    var current = 0;
    setInterval(function () {
      items[current].classList.remove('is-active');
      items[current].setAttribute('aria-hidden', 'true');

      current = (current + 1) % items.length;

      items[current].classList.add('is-active');
      items[current].removeAttribute('aria-hidden');
    }, 3500);
  }

  // --- Public API ---

  return {
    init: function () {
      initNavbar();
      initUnifiedScroll();
      initScrollAnimations();
      initCounters();
      initSmoothScroll();
      initResizeHandler();
      initActiveNav();
      initHeroRotator();
      initBlogFeed();
    }
  };

})();

document.addEventListener('DOMContentLoaded', SprintJudicial.init);
