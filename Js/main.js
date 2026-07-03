document.addEventListener('DOMContentLoaded', () => {
  const loading = document.querySelector('.loading-screen');
  const scrollTop = document.querySelector('.scroll-top');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const newsletterForm = document.getElementById('newsletter-form');
  const cartCount = document.getElementById('menu-cart-count');
  const cartToast = document.getElementById('cart-toast');
  const counters = document.querySelectorAll('.count-up');
  let cart = JSON.parse(localStorage.getItem('flameCart') || '[]');

  const updateCartCount = () => {
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      cartCount.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'}`;
    }
  };

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target || 0);
      const prefix = counter.dataset.prefix || '';
      const suffix = counter.dataset.suffix || '';
      const duration = 1400;
      const startTime = performance.now();

      const step = (timestamp) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = `${prefix}${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
        else counter.textContent = `${prefix}${target}${suffix}`;
      };

      requestAnimationFrame(step);
    });
  };

  const statsSection = document.querySelector('.hero-stats');
  if (counters.length && statsSection) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          obs.disconnect();
        }
      });
    }, { threshold: 0.6 });

    observer.observe(statsSection);
  } else if (counters.length) {
    animateCounters();
  }

  document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = Number(button.dataset.price);
      const existing = cart.find((item) => item.name === name);
      if (existing) existing.qty += 1;
      else cart.push({ name, price, qty: 1 });
      localStorage.setItem('flameCart', JSON.stringify(cart));
      updateCartCount();
      if (cartToast) {
        cartToast.textContent = `${name} added to cart`;
        cartToast.classList.add('show');
        clearTimeout(cartToast.timeout);
        cartToast.timeout = setTimeout(() => cartToast.classList.remove('show'), 1600);
      }
    });
  });

  updateCartCount();

  if (loading) {
    setTimeout(() => loading.classList.add('hidden'), 650);
  }

  const revealOnScroll = () => {
    document.querySelectorAll('[data-aos]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) el.classList.add('aos-animate');
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) scrollTop?.classList.add('show');
    else scrollTop?.classList.remove('show');
  });

  scrollTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  menuToggle?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
  });

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') document.body.classList.add('dark');

  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email');
    if (email && email.value.includes('@')) {
      alert('Thank you for subscribing to Flame Grill updates!');
      email.value = '';
    }
  });
});
