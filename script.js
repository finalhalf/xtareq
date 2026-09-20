const contactDialog = document.querySelector('#contact-dialog');
const openContact = document.querySelector('#open-contact');
const closeContact = document.querySelector('#close-contact');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

openContact.addEventListener('click', () => contactDialog.showModal());
closeContact.addEventListener('click', () => contactDialog.close());

contactDialog.addEventListener('click', (event) => {
  if (event.target === contactDialog) contactDialog.close();
});

contactForm.addEventListener('submit', () => {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
});

const query = new URLSearchParams(window.location.search);
if (query.get('sent') === '1') {
  contactDialog.showModal();
  formStatus.textContent = 'Message sent.';
  contactForm.reset();
  window.history.replaceState({}, '', window.location.pathname);
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
