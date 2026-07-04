// === HERO TYPEWRITER TICKER ===
const roles = [
  "Software Engineer",
  "Backend Engineer",
  "Full Stack Developer",
  "AI Engineer",
  "Forward Deployed Engineer",
  "Data Engineer",
  "RAG & Agentic AI Developer",
  "LLM Systems Builder"
];

const ticker = document.getElementById('heroTicker');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
let pauseTimer = null;

function typeTicker() {
  const current = roles[roleIndex];

  if (!deleting) {
    ticker.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      pauseTimer = setTimeout(typeTicker, 1800);
      return;
    }
    setTimeout(typeTicker, 70);
  } else {
    ticker.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeTicker, 300);
      return;
    }
    setTimeout(typeTicker, 35);
  }
}

typeTicker();

// === NAV ACTIVE STATE ON SCROLL ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  const scrollY = window.scrollY + 80;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
  });
});

// === SKILL CATEGORY FILTER ===
const skillCatBtns  = document.querySelectorAll('.skill-cat-btn');
const skillSections = document.querySelectorAll('.skill-section');

skillCatBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    skillCatBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('data-cat');
    skillSections.forEach(sec => {
      sec.classList.toggle('hidden', sec.getAttribute('data-cat') !== cat);
    });
  });
});

// === PROJECT CATEGORY FILTER ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const countAll = document.getElementById('count-all');

countAll.textContent = projectCards.length;

// Apply featured filter on load
projectCards.forEach(card => {
  if (card.getAttribute('data-featured') !== 'true') {
    card.classList.add('hidden');
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else if (filter === 'featured' && card.getAttribute('data-featured') === 'true') {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// === CONTACT COPY BUTTONS ===
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const text = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      const original = btn.innerHTML;
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = original;
      }, 1800);
    });
  });
});

// === NAV BORDER INTENSITY ON SCROLL ===
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.borderBottomColor = '#a89e92';
  } else {
    navbar.style.borderBottomColor = '#c8bfb2';
  }
}, { passive: true });
