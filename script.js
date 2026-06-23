'use strict';

/* ═══════════════════════════════════════════════════
   RESTAURANT VERSAILLES — PREMIUM JS
   Features: cursor, navbar, nav menu overlay, scroll
   reveal, parallax, menu tabs, carousel, WA forms, toast
   ═══════════════════════════════════════════════════ */

/* ── CURSOR ── */
// Custom cursor disabled as per user preference (standard cursor restored)

/* ── ESPACE GÉRANT REDIRECT HANDLER ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.footer-admin-link').forEach(link => {
    // If it's a redirect to the menu, save flag to open admin modal automatically on load
    if (link.getAttribute('href') && link.getAttribute('href').includes('menu')) {
      link.addEventListener('click', () => {
        localStorage.setItem('versailles_open_admin', 'true');
      });
    }
  });
});

/* ── NAVBAR SCROLL ── */
const $header = document.getElementById('siteHeader');
const onScroll = () => {
  $header.classList.toggle('is-scrolled', window.scrollY > 50);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── FULLSCREEN NAV MENU ── */
const $burger  = document.getElementById('navBurger');
const $navMenu = document.getElementById('navMenu');
let menuOpen = false;

function toggleMenu(force) {
  menuOpen = typeof force !== 'undefined' ? force : !menuOpen;
  $burger.classList.toggle('is-active', menuOpen);
  $navMenu.classList.toggle('is-open', menuOpen);
  $burger.setAttribute('aria-expanded', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

$burger.addEventListener('click', () => toggleMenu());
$navMenu.querySelectorAll('.nav-item, .nav-reserve').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuOpen) toggleMenu(false);
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 60) + 'ms';
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.js-reveal').forEach(el => revealObserver.observe(el));

/* ── PARALLAX IMAGES ── */
const parallaxImgs = document.querySelectorAll('.js-parallax-img');
if (parallaxImgs.length && !isTouch) {
  function applyParallax() {
    parallaxImgs.forEach(wrapper => {
      const rect   = wrapper.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const vCenter= window.innerHeight / 2;
      const ratio  = (center - vCenter) / window.innerHeight;
      const img    = wrapper.querySelector('img');
      if (img) {
        img.style.transform = `scale(1.08) translateY(${ratio * 30}px)`;
      }
    });
  }
  window.addEventListener('scroll', applyParallax, { passive: true });
  applyParallax();
}

/* ── MENU TABS ── */
const tabs   = document.querySelectorAll('.menu-tab');
const panels = document.querySelectorAll('.menu-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.cat;
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('cat-' + cat);
    if (panel) panel.classList.add('active');
  });
  tab.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tab.click(); }
  });
});

/* ── AVIS CAROUSEL ── */
const $track   = document.getElementById('avisTrack');
const $prev    = document.getElementById('avisPrev');
const $next    = document.getElementById('avisNext');
const cards    = $track ? $track.querySelectorAll('.avis-card') : [];
let currentIdx = 0;

function slideTo(idx) {
  if (!cards.length) return;
  const cardW = cards[0].offsetWidth + 3; // gap
  $track.style.transform = `translateX(-${idx * cardW}px)`;
  $track.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
  currentIdx = idx;
}

if ($prev && $next && cards.length) {
  $track.style.overflowX = 'visible';
  $next.addEventListener('click', () => {
    const max = cards.length - (window.innerWidth > 768 ? 2 : 1);
    slideTo(Math.min(currentIdx + 1, max));
  });
  $prev.addEventListener('click', () => {
    slideTo(Math.max(currentIdx - 1, 0));
  });
  window.addEventListener('resize', () => slideTo(0), { passive: true });
}

/* ── TOAST ── */
function showToast(msg, type = '') {
  const $t = document.getElementById('toast');
  if (!$t) return;
  $t.textContent = msg;
  $t.className = 'toast is-show' + (type ? ' is-' + type : '');
  clearTimeout($t._timer);
  $t._timer = setTimeout(() => { $t.className = 'toast'; }, 4500);
}

/* ── RESERVATION FORM ── */
const $resForm = document.getElementById('reservationForm');
if ($resForm) {
  // min date = today
  const $date = document.getElementById('resDate');
  if ($date) {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    $date.min = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }

  $resForm.addEventListener('submit', e => {
    e.preventDefault();
    const name   = $resForm.name.value.trim();
    const phone  = $resForm.phone.value.trim();
    const date   = $resForm.date.value;
    const time   = $resForm.time.value;
    const guests = $resForm.guests.value;
    const note   = $resForm.note ? $resForm.note.value.trim() : '';

    if (!name || !phone || !date || !time || !guests) {
      showToast('Veuillez compléter tous les champs obligatoires.', 'error');
      return;
    }

    const dateLabel = new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    const parts = [
      '🏪 *Réservation — Restaurant Versailles*',
      '',
      `👤 Nom : ${name}`,
      `📞 Tél : ${phone}`,
      `📅 Date : ${dateLabel}`,
      `🕐 Heure : ${time}`,
      `👥 Personnes : ${guests}`,
      note ? `📝 Note : ${note}` : '',
      '',
      '_Envoyé depuis versailles-conakry.com_'
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/224628434445?text=${encodeURIComponent(parts)}`, '_blank', 'noopener');
    showToast('Redirection vers WhatsApp…');
    $resForm.reset();
  });
}

/* ── CONTACT FORM ── */
const $contactForm = document.getElementById('contactForm');
if ($contactForm) {
  $contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = $contactForm.name ? $contactForm.name.value.trim() : document.getElementById('cName').value.trim();
    const phone = $contactForm.phone ? $contactForm.phone.value.trim() : document.getElementById('cPhone').value.trim();
    const msg = $contactForm.message ? $contactForm.message.value.trim() : document.getElementById('cMsg').value.trim();

    if (!name || !phone || !msg) {
      showToast('Veuillez remplir tous les champs.', 'error');
      return;
    }
    const parts = [
      '💬 *Message — Restaurant Versailles*',
      '',
      `👤 Nom : ${name}`,
      `📞 Tél : ${phone}`,
      '',
      `Message : ${msg}`,
      '',
      '_Via versailles-conakry.com_'
    ].join('\n');

    window.open(`https://wa.me/224628434445?text=${encodeURIComponent(parts)}`, '_blank', 'noopener');
    showToast('Message envoyé sur WhatsApp.');
    $contactForm.reset();
  });
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── GALLERY LIGHTBOX ── */
document.querySelectorAll('.g-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    const alt = item.querySelector('img').alt;
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.95)',
      zIndex: '9999', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'
    });
    const img = document.createElement('img');
    img.src = src; img.alt = alt;
    Object.assign(img.style, { maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' });
    overlay.appendChild(img);
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
    });
    document.body.appendChild(overlay);
  });
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', item.querySelector('figcaption').textContent + ' — Agrandir');
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); }
  });
});

/* ── ACTIVE NAV LINK ── */
const sectionEls  = document.querySelectorAll('section[id]');
const navItems    = document.querySelectorAll('.nav-item, .d-nav-item');
const secObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(l => {
        const href = l.getAttribute('href') || '';
        const match = href === '#' + id || href.endsWith('#' + id);
        l.style.color = match ? 'var(--terra)' : '';
      });
    }
  });
}, { threshold: 0.5 });
sectionEls.forEach(s => secObserver.observe(s));

/* ── SMOOTH SCROLL ON LOAD ── */
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 300);
    }
  }
});
