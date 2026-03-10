/* =============================================
   SHREYAS ANCHATAGERI — PORTFOLIO SCRIPTS
   ============================================= */

/* ── SCROLL REVEAL ──────────────────────────── */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger sibling reveals inside the same parent
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
          );
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
})();


/* ── NAVBAR SCROLL SHADOW ───────────────────── */
(function initNavShadow() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handler = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handler, { passive: true });
  handler(); // run once on load
})();


/* ── MOBILE NAV TOGGLE ──────────────────────── */
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  if (!toggle || !navbar) return;

  toggle.addEventListener('click', () => {
    navbar.classList.toggle('mobile-open');
  });

  // Close on link click
  navbar.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => navbar.classList.remove('mobile-open'));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navbar.classList.remove('mobile-open');
    }
  });
})();


/* ── ACTIVE NAV LINK ON SCROLL ──────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((sec) => observer.observe(sec));
})();


/* ── CONTACT FORM SEND BUTTON ───────────────── */
(function initContactForm() {
  const btn = document.getElementById('sendBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.contact-form .form-input');
    let allFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = '#ef4444';
        setTimeout(() => (input.style.borderColor = ''), 2000);
      }
    });

    if (!allFilled) return;

    // Simulate sending
    btn.disabled = true;
    btn.textContent = 'Sending…';
    btn.style.opacity = '0.7';

    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.classList.add('success');
      btn.style.opacity = '1';

      inputs.forEach((input) => (input.value = ''));

      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.classList.remove('success');
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
})();


/* ── SKILL CHIP HOVER RIPPLE ────────────────── */
(function initChipRipple() {
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%; transform:scale(0);
        background:rgba(29,78,216,0.15); pointer-events:none;
        width:60px; height:60px;
        left:${e.clientX - rect.left - 30}px;
        top:${e.clientY - rect.top - 30}px;
        animation: ripple 0.5s linear;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframe once
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();


/* ── SMOOTH SCROLL OFFSET FOR FIXED NAV ─────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
