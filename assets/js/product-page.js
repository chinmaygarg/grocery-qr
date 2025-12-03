// Shared JS for product QR pages: lightweight, no frameworks.
// Features: image carousel, lazy loading enhancement, micro-interactions.

(function () {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = carousel.querySelectorAll('[data-carousel-slide]');
    const dots = carousel.querySelectorAll('[data-carousel-dot]');

    if (!track || slides.length === 0) return;

    let index = 0;
    let autoTimer;

    const setIndex = (i) => {
      index = i < 0 ? slides.length - 1 : i % slides.length;
      const offset = -index * 100;
      track.style.transform = `translateX(${offset}%)`;
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === index);
      });
    };

    const next = () => setIndex(index + 1);

    const startAuto = () => {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 4800);
    };

    // Swipe support for touch
    let startX = 0;
    let isSwiping = false;

    carousel.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      startX = t.clientX;
      isSwiping = true;
      clearInterval(autoTimer);
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const t = e.touches[0];
      const delta = t.clientX - startX;
      if (Math.abs(delta) > 40) {
        isSwiping = false;
        if (delta < 0) next();
        else setIndex(index - 1);
        startAuto();
      }
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
      isSwiping = false;
      startAuto();
    });

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        setIndex(dotIndex);
        startAuto();
      });
    });

    setIndex(0);
    startAuto();
  });

  // Progressive lazy loading enhancement (on top of loading="lazy")
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const dataSrc = img.getAttribute('data-src');
          if (dataSrc && !img.src) {
            img.src = dataSrc;
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '120px 0px',
      threshold: 0.01,
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      io.observe(img);
    });
  }
})();
