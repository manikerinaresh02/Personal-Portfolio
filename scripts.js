// Dark Mode Toggle
// Remove old dark mode toggle logic
// --- THEME CONTROLLER LOGIC START ---
function setTheme(dark) {
  if (dark) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}
window.addEventListener('DOMContentLoaded', function() {
  const themeController = document.querySelector('.theme-controller');
  // Set initial state from localStorage
  const isDark = localStorage.getItem('theme') === 'dark';
  setTheme(isDark);
  if (themeController) themeController.checked = isDark;
  // Listen for changes
  if (themeController) {
    themeController.addEventListener('change', function() {
      setTheme(this.checked);
    });
  }
});
// --- THEME CONTROLLER LOGIC END ---
// On load, set theme from localStorage
// Animate skill bars
document.querySelectorAll('.progress').forEach(bar => {
  const width = bar.style.width;
  bar.style.width = '0';
  setTimeout(() => {
    bar.style.width = width;
  }, 400);
});
// Scroll reveal animation using Intersection Observer
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skills section
        if (entry.target.id === 'skills') {
          // Animate .skills-group
          entry.target.querySelectorAll('.skills-group').forEach((group, i) => {
            setTimeout(() => group.classList.add('visible'), 120 + i * 120);
            // Animate .skill-icon inside each group
            group.querySelectorAll('.skill-icon').forEach((icon, j) => {
              setTimeout(() => icon.classList.add('visible'), 300 + i * 120 + j * 80);
            });
          });
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));
}
revealOnScroll();
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- PROJECT CAROUSEL LOGIC START ---
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-carousel').forEach(function(carousel) {
    const images = carousel.querySelectorAll('.carousel-img');
    const indicators = carousel.querySelectorAll('.indicator');
    const leftArrow = carousel.querySelector('.carousel-arrow.left');
    const rightArrow = carousel.querySelector('.carousel-arrow.right');
    let current = 0;
    function showImage(idx) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === idx);
      });
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === idx);
      });
      current = idx;
    }
    leftArrow.addEventListener('click', function() {
      let idx = (current - 1 + images.length) % images.length;
      showImage(idx);
    });
    rightArrow.addEventListener('click', function() {
      let idx = (current + 1) % images.length;
      showImage(idx);
    });
    indicators.forEach((ind, i) => {
      ind.addEventListener('click', function() {
        showImage(i);
      });
    });
    // Optional: swipe support for touch devices
    let startX = null;
    carousel.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) startX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', function(e) {
      if (startX !== null && e.changedTouches.length === 1) {
        let dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) {
          if (dx > 0) leftArrow.click();
          else rightArrow.click();
        }
      }
      startX = null;
    });
  });
});
// --- PROJECT CAROUSEL LOGIC END ---

// --- MOBILE MENU LOGIC START ---
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
});
// --- MOBILE MENU LOGIC END --- 