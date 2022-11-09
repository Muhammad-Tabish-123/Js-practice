'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab ');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content ');
const nav = document.querySelector('nav');

///////////////////////////////////////
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
///////////////////////////////////////
// Button scrolling

btnScrollto.addEventListener('click', function (e) {
  const s1coordss = section1.getBoundingClientRect();
  console.log(s1coordss);

  // console.log(btnScrollto.getBoundingClientRect());
  console.log(e.target.getBoundingClientRect());

  //X distance from left
  //Y distance from top
  console.log('current scroll (X/Y): ', window.pageXOffset, window.pageYOffset);

  console.log(
    'Height/Width of chrome window or view port: ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling function

  //Old Scool way
  //   window.scroll(
  //     s1coordss.left + window.pageXOffset,
  //     s1coordss.top + window.pageYOffset
  //   );
  // });

  //Old Scool way smooth
  // window.scroll({
  //   left: s1coordss.left + window.pageXOffset,
  //   top: s1coordss.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //Modren Method
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     // console.log('Clicked');

//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

//1.Add event listener to common parent element
//2.What element orignated event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  //Matching Strategy
  if (
    e.target.classList.contains('nav__link') &&
    e.target.getAttribute('href') !== '#'
  ) {
    // console.log('LINKs');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
///////////////////////////////////////
// Tabbed Componenet

// tabs.forEach(t =>
//   t.addEventListener('click', function () {
//     console.log('Tab');
//   })
// );

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Guard Class
  if (!clicked) return;

  //Remove active classes
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  //Active Tab
  clicked.classList.add('operations__tab--active');

  //Active Content Area
  // console.log(clicked.dataset.tab);
  // console.log(document.querySelector(`.operations__content--${clicked.dataset.tab}`));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(this );
    const link = e.target;
    // console.log(link);
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

/*
// Passing arguments in handeler function
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//Using arguments in handeler function
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));
*/

///////////////////////////////////////
///////////////////////////////////////
// Sticky navigation

/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function (e) {
  // console.log(this.window.scrollY);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

///////////////////////////////////////
///////////////////////////////////////
//Sticky navigation: Intersection observer API Practice

/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};
const obsOptions = {
  root: null,
  // threshold: 0.1,
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

///////////////////////////////////////
///////////////////////////////////////
//Sticky navigation: Intersection observer API Implementing

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  // console.log(entries);
  const [entry] = entries;
  // console.log('--------entry desturctring-------------');
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin: '-90px',
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // console.log(entry.target);
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  // section.classList.add('section--hidden');
  // sectionObserver.observe(section);
});

///////////////////////////////////////
///////////////////////////////////////
// Lazy loading images

const imgTarget = document.querySelectorAll('img[data-src]');
// console.log(...imgTarget);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //Repace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
  // rootMargin: -200, => error
});

imgTarget.forEach(img => imageObserver.observe(img));

///////////////////////////////////////
///////////////////////////////////////
// Slider
function slider() {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let currSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
    // activateDot(slide);
  };

  // creating Dots to slide images
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide=${i}></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //Checking goToSlide(0) results and making visible
  // slider.style.overflow = 'visible';
  // slider.style.transform = 'scale(0.3) translateX(-1450px)';

  const init = function () {
    //initializations
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Next slide
  const nextSlide = function () {
    // console.log('from: ' + currSlide);
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    // console.log('now: ' + currSlide);
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  //Previous slide
  const prevSlide = function () {
    // console.log('from: ' + currSlide);
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }
    // console.log('now: ' + currSlide);
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') prevSlide(currSlide);
    e.key === 'ArrowRight' && nextSlide(currSlide);
    activateDot(currSlide);
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}

slider();
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/*
///////////////////////////////////////
// Selecting, Creating, and Deleting Elements


// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(document.querySelectorAll('.section'));
console.log(allSections);

console.log(document.getElementById('section--1'));

const allButtons = document.getElementsByTagName('button');
// console.log(document.getElementsByTagName('button'));
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent ='We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

///////////////////////////////////////
// Styles, Attributes and Classes

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use
logo.clasName = 'jonas';


*/

/*
///////////////////////////////////////
// Types of Events and Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
*/

/*
///////////////////////////////////////
// Event Propagation in Practice

//rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('link');
  this.style.backgroundColor = randomColor();
  console.log('Link: ', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop propagation / Bubbling
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log('link');
  this.style.backgroundColor = randomColor();
  console.log('Conatiner: ', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  // console.log('link');
  this.style.backgroundColor = randomColor();
  console.log('NAV: ', e.target, e.currentTarget);
});
*/

/*
///////////////////////////////////////
// DOM Traversing
const h1 = document.querySelector('h1');
console.log(h1);

// Going downwards: child
console.log('------------------Going downwards: child------------------');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
// console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log('------------------Going upwards: parents------------------');
console.log(h1.parentNode);
console.log(h1.parentElement);

// console.log(h1.closest('.header'));
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// console.log(h1.closest('h1'));
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log('------------------Going sideways: siblings------------------');
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  // console.log(el);
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

///////////////////////////////////////
// Lifecycle DOM Events
/*
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/
