// ================= Navbar Active on Scroll =================
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });
};

// ================= Mobile Menu Toggle =================
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if(menuIcon){
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  }
}

// ================= Work Tabs =================
let tabBtns = document.querySelectorAll('.tab-btn');
let workContents = document.querySelectorAll('.work-content');

tabBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    workContents.forEach(c => c.style.display = 'none');

    btn.classList.add('active');
    workContents[i].style.display = 'grid';
  });
});

// ================= Skills Progress Animation =================
let skillsSection = document.querySelector('.skills');
let progressBars = document.querySelectorAll('.progress-bar span');
let animated = false;

window.addEventListener('scroll', () => {
  let sectionTop = skillsSection.offsetTop - 200;
  let sectionHeight = skillsSection.offsetHeight;
  let scrollPos = window.scrollY + window.innerHeight;

  if (scrollPos > sectionTop && !animated) {
    progressBars.forEach(bar => {
      let width = bar.getAttribute('data-width');
      bar.style.width = width;
    });
    animated = true;
  }
});

// ================= Smooth Scroll =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ================= Fade Animation on Scroll =================
const fadeElements = document.querySelectorAll('.fade-up');

function fadeInOnScroll() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll();
// ===== Scroll Animation for Work Section =====
const animatedElements = document.querySelectorAll('.work-box, .project-item');

window.addEventListener('scroll', () => {
  animatedElements.forEach(el => {
    const elPosition = el.getBoundingClientRect().top;
    
    const screenPosition = window.innerHeight - 100; // trigger point

    if (elPosition < screenPosition) {
      el.classList.add('show-animate');
    } else {
      el.classList.remove('show-animate');
    }
  });
});
