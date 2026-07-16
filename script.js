document.addEventListener('DOMContentLoaded', () => {

  const carouselEl = document.querySelector('#mainCarousel');
  if (carouselEl && window.bootstrap) {
    const carousel = new bootstrap.Carousel(carouselEl);
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    if (prevBtn) prevBtn.addEventListener('click', () => carousel.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => carousel.next());
  }

  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('h-16');
      header.classList.remove('h-20');
    } else {
      header.classList.add('h-20');
      header.classList.remove('h-16');
    }
  });

  /* ---------- Menú móvil ---------- */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      mobileNav.classList.toggle('flex');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        mobileNav.classList.remove('flex');
      });
    });
  }

  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.dataset.section === currentId);
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();


  document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.parentElement.classList.add('translate-x-1');
    });
    input.addEventListener('blur', () => {
      input.parentElement.parentElement.classList.remove('translate-x-1');
    });
  });

});

function toggleAccordion(button) {
  const item = button.closest('.accordion-item');
  const isOpen = item.classList.contains('accordion-active');

  document.querySelectorAll('.accordion-item').forEach(el => {
    el.classList.remove('accordion-active');
    const icon = el.querySelector('.material-symbols-outlined');
    if (icon) icon.style.transform = 'rotate(0deg)';
  });

  if (!isOpen) {
    item.classList.add('accordion-active');
    button.querySelector('.material-symbols-outlined').style.transform = 'rotate(180deg)';
  }
}

function toggleModal(id) {
  const modal = document.getElementById(id);
  if (modal.classList.contains('hidden')) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('[id$="-modal"]').forEach(modal => {
      if (!modal.classList.contains('hidden')) toggleModal(modal.id);
    });
  }
});

/* ---------- Formulario de contacto ---------- */
function handleFormSubmit(event) {
  event.preventDefault();

  const btn = event.submitter;
  const originalText = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = `
    <span>Enviando...</span>
    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  `;
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = originalText;
    event.target.reset();
  }, 2000);
}