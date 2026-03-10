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

    fetch(BLOG_RSS)
      .then(function (res) {
        if (!res.ok) throw new Error('RSS fetch failed');
        return res.text();
      })
      .then(function (text) {
        var parser = new DOMParser();
        var xml = parser.parseFromString(text, 'text/xml');
        var items = xml.querySelectorAll('item');

        if (items.length === 0) throw new Error('No items');

        var count = 0;
        var html = '';

        items.forEach(function (item) {
          if (count >= MAX_POSTS) return;

          var title = item.querySelector('title');
          var link = item.querySelector('link');
          var description = item.querySelector('description');
          var pubDate = item.querySelector('pubDate');

          if (!title || !link) return;

          var titleText = title.textContent;
          var linkText = link.textContent;

          // Skip non-article pages
          if (titleText === 'Archives' || titleText === 'Tags') return;

          var excerpt = '';
          if (description) {
            var tmp = document.createElement('div');
            tmp.innerHTML = description.textContent;
            excerpt = tmp.textContent.substring(0, 150);
            if (tmp.textContent.length > 150) excerpt += '…';
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

          html += '<a href="' + linkText + '" class="blog__card" target="_blank" rel="noopener noreferrer">';
          if (dateStr) html += '<span class="blog__card-date">' + dateStr + '</span>';
          html += '<h3 class="blog__card-title">' + titleText + '</h3>';
          if (excerpt) html += '<p class="blog__card-excerpt">' + excerpt + '</p>';
          html += '<span class="blog__card-link">Leer m&aacute;s &rarr;</span>';
          html += '</a>';

          count++;
        });

        if (count > 0) {
          grid.innerHTML = html;
          if (fallback) fallback.style.display = 'none';
        }
      })
      .catch(function () {
        // CORS or network error: show fallback link
        grid.style.display = 'none';
      });
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
      initBlogFeed();
    }
  };

})();

document.addEventListener('DOMContentLoaded', SprintJudicial.init);
