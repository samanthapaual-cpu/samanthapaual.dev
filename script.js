
/* ── Typing animation ── */
(function () {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'IT Student',
    'Aspiring AI Engineer',
    'Software Developer',
    'Flutter Developer',
    'Figma Designer',
    'AI Language Assessor',
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const word = phrases[pi];
    el.textContent = word.slice(0, ci);

    if (!deleting) {
      if (ci < word.length) { ci++; setTimeout(tick, 85); }
      else { deleting = true; setTimeout(tick, 2000); }
    } else {
      if (ci > 0) { ci--; setTimeout(tick, 48); }
      else {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(tick, 320);
      }
    }
  }

  tick();
})();


/* ── Theme toggle ── */
(function () {
  const button = document.querySelector('.theme-toggle');
  if (!button) return;

  const root = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme');

  function setTheme(theme) {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    button.querySelector('.theme-toggle-icon').textContent = isDark ? '☀' : '☾';
    button.querySelector('.theme-toggle-label').textContent = isDark ? 'Light mode' : 'Dark mode';
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }

  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  button.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });
})();


/* ── Scroll fade-in ── */
(function () {
  const els = document.querySelectorAll('.fade');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach((el) => io.observe(el));
})();


/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ── Selected moments carousel ── */
(function () {
  const gallery = document.querySelector('.gallery-grid');
  const track = document.querySelector('.gallery-track');
  const nextButton = document.querySelector('.gallery-next');
  if (!gallery || !track) return;

  const panels = Array.from(track.querySelectorAll('.gallery-item'));
  let currentIndex = 0;
  let direction = 0;
  let isActive = false;
  let lastMove = 0;

  function showPanel(index) {
    currentIndex = Math.max(0, Math.min(panels.length - 1, index));
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      showPanel(currentIndex + 1 >= panels.length ? 0 : currentIndex + 1);
    });
  }

  gallery.addEventListener('mousemove', (event) => {
    isActive = true;
    const bounds = gallery.getBoundingClientRect();
    direction = event.clientX < bounds.left + bounds.width / 2 ? -1 : 1;
  });

  gallery.addEventListener('mouseenter', () => { isActive = true; });
  gallery.addEventListener('mouseleave', () => {
    isActive = false;
    direction = 0;
  });

  function followCursor(timestamp) {
    if (isActive && direction !== 0 && timestamp - lastMove > 700) {
      showPanel(currentIndex + direction);
      lastMove = timestamp;
    }
    requestAnimationFrame(followCursor);
  }

  requestAnimationFrame(followCursor);
})();
