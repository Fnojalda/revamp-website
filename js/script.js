let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
  let scrollTop = window.scrollY;

  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // scrolling down
    header.classList.add('hide');
  } else {
    // scrolling up
    header.classList.remove('hide');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // avoid negative scroll
});



// Parallax
const section1 = document.querySelector('.section-1');
window.addEventListener('scroll', () => {
  section1.style.transform = `translateY(${-window.scrollY/5}px)`;
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('overlay');
const exitBtn = document.getElementById('exitBtn');
hamburger.addEventListener('click', ()=>overlay.classList.add('active'));
exitBtn.addEventListener('click', ()=>overlay.classList.remove('active'));
overlay.querySelectorAll('a').forEach(link => link.addEventListener('click', ()=>overlay.classList.remove('active')));

// Adaptive Section Height
function updateSectionHeights() {
  const sections = document.querySelectorAll('.section:not(.section-1)');
  sections.forEach(section => {
    let maxHeight = 0;
    Array.from(section.children).forEach(child => {
      const bottom = child.offsetTop + child.offsetHeight;
      if(bottom > maxHeight) maxHeight = bottom;
    });
    section.style.height = maxHeight + 60 + "px";
  });
}
window.addEventListener('load', updateSectionHeights);
window.addEventListener('resize', updateSectionHeights);

// Slider functionality
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const thumbs = document.querySelectorAll('.thumbnails img');

let currentIndex = 0;

function updateSlide() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  thumbs.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentIndex);
  });
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlide();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlide();
});

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    currentIndex = index;
    updateSlide();
  });
});

updateSlide();

