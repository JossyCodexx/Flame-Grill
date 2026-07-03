document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !emailInput.value.includes('@')) {
        event.preventDefault();
        alert('Please enter a valid email address.');
      }
    });
  });
});
