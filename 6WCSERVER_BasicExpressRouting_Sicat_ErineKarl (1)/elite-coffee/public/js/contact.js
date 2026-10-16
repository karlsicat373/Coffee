// Contact form is front-end only for this activity: show a confirmation message.
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements['name'].value.trim();
  msg.textContent = `Thank you, ${name || 'friend'}! Your message has been received.`;
  form.reset();
});
