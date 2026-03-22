
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