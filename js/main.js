/* ==========================================================================
   La Conciergerie de Véro — main.js
   Comportements partagés par toutes les pages du site.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- menu mobile ---------- */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  /* ---------- apparition au scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: .15 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- curseur avant / après ---------- */
  const slider = document.getElementById('baSlider');
  const after = document.getElementById('baAfter');
  const handle = document.getElementById('baHandle');
  if (slider && after && handle) {
    let dragging = false;

    function setPos(clientX) {
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    }
    handle.addEventListener('pointerdown', () => dragging = true);
    window.addEventListener('pointerup', () => dragging = false);
    window.addEventListener('pointermove', (e) => { if (dragging) setPos(e.clientX); });
    slider.addEventListener('click', (e) => setPos(e.clientX));
  }

  /* ---------- accordéon FAQ ---------- */
  document.querySelectorAll('.faq-item button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- formulaire de contact (placeholder) ----------
     Pas d'envoi réel : à brancher sur un backend / service tiers. */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('formFeedback');
      if (feedback) {
        feedback.textContent = 'Formulaire de démonstration — à connecter à un service d\'envoi.';
      }
    });
  }

});
