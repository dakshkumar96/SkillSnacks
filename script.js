// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // 1. Pause slider when mouse is over it
  const slider = document.querySelector('.quotes-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => {
      slider.style.animationPlayState = 'paused';
    });
    slider.addEventListener('mouseleave', () => {
      slider.style.animationPlayState = 'running';
    });

    // Buttons for moving between quotes
    const prev = document.querySelector('.prev-quote');
    const next = document.querySelector('.next-quote');
    const cards = slider.children;
    let index = 0;
    const total = cards.length;

    function showSlide(i) {
      slider.style.transform = `translateX(-${i * 100}%)`;
      index = i;
    }

    if (prev) {
      prev.addEventListener('click', () => {
        showSlide((index - 1 + total) % total);
      });
    }
    if (next) {
      next.addEventListener('click', () => {
        showSlide((index + 1) % total);
      });
    }
  }

  // 2. Filter and search snacks in the library page
  const filterForm = document.querySelector('.filter-form');
  if (filterForm) {
    const cards = document.querySelectorAll('.snack-card');
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = filterForm.category.value.toLowerCase();
      const searchText = filterForm.search.value.toLowerCase();

      cards.forEach(card => {
        const title = card.querySelector('.snack-title').textContent.toLowerCase();
        const tags = card.dataset.category || '';
        const matches = (category === 'all' || tags.includes(category)) && title.includes(searchText);
        card.style.display = matches ? '' : 'none';
      });
    });
  }

  // 5. Smooth scroll when clicking links on the same page
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 6. Hide header when scrolling down, show when scrolling up
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll) {
        header.style.transform = 'translateY(-100%)'; // hide
      } else {
        header.style.transform = 'translateY(0)'; // show
      }
      lastScroll = currentScroll;
    });
  }

  // 7. Ripple effect on buttons
  document.querySelectorAll('.btn--primary, .btn--secondary').forEach(button => {
    button.addEventListener('click', e => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      button.appendChild(ripple);

      const size = Math.max(button.clientWidth, button.clientHeight);
      ripple.style.width = ripple.style.height = size + 'px';

      const rect = button.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // 8. Lazy load images only when user scrolls to them
  const lazyImages = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '0px 0px 200px 0px' });

  lazyImages.forEach(img => observer.observe(img));
});
