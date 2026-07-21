/**
 * NEWSEN — 순수 JavaScript
 * 헤더 / 캐러셀 / FAQ / 갤러리 라이트박스 / 뉴스레터
 */

(function () {
  'use strict';

  /* ---------- Header: scroll + mobile menu ---------- */
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  window.addEventListener(
    'scroll',
    function () {
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    },
    { passive: true }
  );

  function setMenuOpen(open) {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.toggle('is-hidden', !open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    if (iconMenu && iconClose) {
      iconMenu.classList.toggle('is-hidden', open);
      iconClose.classList.toggle('is-hidden', !open);
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      setMenuOpen(open);
    });
  }

  document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  /* ---------- Hero Carousel ---------- */
  const track = document.getElementById('carousel-track');
  const slides = track ? track.querySelectorAll('.carousel-slide') : [];
  const dots = document.querySelectorAll('.carousel-dot');
  const counter = document.getElementById('carousel-counter');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const controls = document.querySelector('.carousel-controls');
  const total = slides.length;
  let current = 0;
  let timer = null;

  function go(index) {
    if (!total) return;
    current = ((index % total) + total) % total;
    if (track) track.style.transform = 'translateX(-' + current * 100 + '%)';

    slides.forEach(function (slide, i) {
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });

    dots.forEach(function (dot, i) {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });

    if (counter) counter.textContent = current + 1 + ' / ' + total;
    restartAutoplay();
  }

  function restartAutoplay() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      go(current + 1);
    }, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      go(Number(dot.getAttribute('data-index')));
    });
  });

  if (controls) {
    controls.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') go(current - 1);
      if (e.key === 'ArrowRight') go(current + 1);
    });
  }

  if (total) go(0);

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const wasOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('is-open');
        const q = el.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Gallery Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, title) {
    if (!lightbox || !lightboxImg || !lightboxTitle) return;
    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightbox.classList.remove('is-hidden');
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('is-hidden');
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  }

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      openLightbox(item.getAttribute('data-src'), item.getAttribute('data-title') || '');
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('is-hidden')) {
      closeLightbox();
    }
  });

  /* ---------- Newsletter ---------- */
  const form = document.getElementById('newsletter-form');
  const success = document.getElementById('newsletter-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = form.querySelector('#newsletter-email');
      if (email && email.value) {
        form.classList.add('is-hidden');
        if (success) success.classList.remove('is-hidden');
      }
    });
  }
})();
