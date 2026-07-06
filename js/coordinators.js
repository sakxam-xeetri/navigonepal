/* ============================================================
   Coordinators Page — Interactions & Animations
   ============================================================ */

(function () {
  'use strict';

  // --- Scroll Reveal ---
  function initReveal() {
    const els = document.querySelectorAll(
      '.coord-leader-card, .coord-card, .coord-section-header, .coord-network-content, .coord-network-visual, .coord-stat-item'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('coord-reveal', 'revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => {
      el.classList.add('coord-reveal');
      observer.observe(el);
    });
  }

  // --- Navbar scroll behavior ---
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current > 80) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
      lastScroll = current;
    }, { passive: true });
  }

  // --- Theme toggle (reuse from main site) ---
  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const html = document.documentElement;
    const stored = localStorage.getItem('theme');
    if (stored) html.setAttribute('data-theme', stored);

    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // --- Stagger reveal for grid children ---
  function initStagger() {
    const grids = document.querySelectorAll('.coord-core-grid, .coord-leadership-grid, .coord-network-stats');
    grids.forEach((grid) => {
      const children = grid.children;
      Array.from(children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.06}s`;
      });
    });
  }

  // --- Mobile Navigation ---
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');

    function openMobileNav() {
      if (hamburger) hamburger.classList.add('open');
      if (mobileNav) mobileNav.classList.add('open');
      if (mobileNavOverlay) mobileNavOverlay.classList.add('open');
      document.body.classList.add('nav-open');
    }

    function closeMobileNav() {
      if (hamburger) hamburger.classList.remove('open');
      if (mobileNav) mobileNav.classList.remove('open');
      if (mobileNavOverlay) mobileNavOverlay.classList.remove('open');
      document.body.classList.remove('nav-open');
    }

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        if (mobileNav && mobileNav.classList.contains('open')) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
    if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    initMobileNav();
    initReveal();
    initStagger();
  });
})();
