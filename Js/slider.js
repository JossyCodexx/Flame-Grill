document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('[data-slide]'));
  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none';
  });
  let current = 0;
  setInterval(() => {
    slides.forEach((slide, index) => {
      slide.style.display = index === current ? 'block' : 'none';
    });
    current = (current + 1) % slides.length;
  }, 5000);
});
