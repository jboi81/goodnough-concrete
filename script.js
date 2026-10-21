// Goodnough Concrete LLC — site interactions
// 1. Mobile nav toggle  2. Smooth scrolling  3. Estimate form (Netlify Forms)

// --- Mobile nav ---
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the menu when a link is tapped (mobile)
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// --- Smooth scrolling for in-page links ---
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// --- Quote form ---
// Submits to Netlify Forms (the form carries data-netlify="true" in the
// HTML, so Netlify records every POST in the site's Forms dashboard).
const form = document.getElementById('quote-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = form.elements.name.value.trim();
  const contact = form.elements.contact.value.trim();
  const service = form.elements.service.value;

  if (!name || !contact || !service) {
    formMessage.textContent = 'Please fill in your name, contact info, and a service.';
    formMessage.className = 'form-note error';
    return;
  }

  formMessage.textContent = 'Sending…';
  formMessage.className = 'form-note';

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    if (!response.ok) throw new Error(`Form POST failed: ${response.status}`);
    formMessage.textContent = `Thanks, ${name}! We'll reach out about your ${service.toLowerCase()} quote soon.`;
    formMessage.className = 'form-note success';
    form.reset();
  } catch (error) {
    formMessage.textContent = 'Something went wrong sending that — please call (864) 395-0756 instead.';
    formMessage.className = 'form-note error';
  }
});
