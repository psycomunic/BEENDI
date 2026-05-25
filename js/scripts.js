document.addEventListener('DOMContentLoaded', () => {
  
  // Custom Cursor (Desktop only via CSS media queries, but we can also disable logic on touch devices)
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const cursor = document.createElement('div');
  
  if (!isTouchDevice) {
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, button, .cta-box');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // Intersection Observer for fade-up animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
        
        // Counter Animation trigger
        if (entry.target.classList.contains('counter')) {
          animateCounter(entry.target);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .counter').forEach(el => observer.observe(el));

  // Counter Animation Function
  function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        el.innerText = '+' + Math.ceil(current).toLocaleString('pt-BR');
        requestAnimationFrame(updateCounter);
      } else {
        el.innerText = '+' + target.toLocaleString('pt-BR');
      }
    };
    updateCounter();
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu'); // Assumes we create a mobile-menu div later if needed
  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('active');
  });

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all others
      document.querySelectorAll('.accordion-item').forEach(acc => acc.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Tabs Switcher
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update content logic would go here depending on index
      // (Mockup provided just switches button state)
    });
  });

  // Mini Tabs Switcher
  const miniTabs = document.querySelectorAll('.mini-tab');
  miniTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mini-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

});
