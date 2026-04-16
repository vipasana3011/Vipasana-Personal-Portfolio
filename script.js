/* =====================================================
   🌸 Elegant & Aesthetic Portfolio Script
   Optimized for Performance, Responsiveness, and UX
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= Mobile Menu Toggle ================= */
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
      });
    });
  }

  /* ================= Active Navbar on Scroll ================= */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');

  function setActiveNav() {
    let scrollY = window.scrollY;

    sections.forEach(sec => {
      const offset = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= offset && scrollY < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);

  /* ================= Smooth Scrolling ================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ================= Scroll Reveal Animation ================= */
  const revealElements = document.querySelectorAll(
    '.home-content, .home-img, .edu-card, .work-box, .project-item, .skill-card, .internship-card, .contact-form, .passion-box'
  );

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add('show-animate');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  /* ================= Skills Progress Animation ================= */
  const skillsSection = document.querySelector('.skills');
  const progressBars = document.querySelectorAll('.progress-bar span');
  let animated = false;

  function animateSkills() {
    if (!skillsSection || progressBars.length === 0) return;

    const sectionTop = skillsSection.offsetTop - 200;
    const scrollPos = window.scrollY + window.innerHeight;

    if (scrollPos > sectionTop && !animated) {
      progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) bar.style.width = width;
      });
      animated = true;
    }
  }

  window.addEventListener('scroll', animateSkills);

  /* ================= Scroll Progress Bar ================= */
  const scrollProgress = document.createElement('div');
  scrollProgress.id = 'scrollProgress';
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + "%";
  });

  /* ================= Back-to-Top Button ================= */
  const backToTop = document.createElement('button');
  backToTop.id = 'backToTop';
  backToTop.innerHTML = "💕";
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ================= Cute Ripple Effect on Buttons ================= */
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
      circle.classList.add('ripple');

      const ripple = this.querySelector('.ripple');
      if (ripple) ripple.remove();

      this.appendChild(circle);
    });
  });

  /* ================= Typing Animation ================= */
  const textElement = document.querySelector('.text-animate');
  if (textElement) {
    const words = [
      "Digital Media Specialist",
      "Social Media Manager",
      "Web Developer",
      "Creative Designer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      const displayedText = isDeleting
        ? currentWord.substring(0, charIndex--)
        : currentWord.substring(0, charIndex++);

      textElement.textContent = displayedText;

      let speed = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

});
