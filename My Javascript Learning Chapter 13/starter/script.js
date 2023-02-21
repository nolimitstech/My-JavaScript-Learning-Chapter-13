'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();///stops any default behavior
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//OR using for loop below

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//////////SELECTING ELEMENTS
console.log(document.documentElement);///selects the entire elemnt of any web page
console.log(document.head);//selects head
console.log(document.body);//selects body
const header = document.querySelector('.header');///selects the first class with the name header
//const allSections = document.querySelectorAll('.section');///selects all matching clases
//console.log(allSections);

document.getElementById('section--1');///selects an id
const allButtons = document.getElementsByTagName('button');///selects all buttons etc
console.log(allButtons);
document.getElementsByClassName('btn');///selects all clases with the name button

//////////CREATING AND INSERTING ELEMNTS
const message = document.createElement('div');///creates a div
message.classList.add('cookie-message');////adds a class to the div
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';///adds html nd button

//header.prepend(message);//////adds message variable as the ist child of the header. placed on top
header.append(message);////adds as last child, moves it from top to bottom
//header.append(message.cloneNode(true));///duplicates copies of message at diff. positions at once

header.before(message);///////inserts the msg elemnt b4 the header, though sibligs
header.after(message);///inserts after

///to delete an element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    message.parentElement.removeChild(message);
  });///deletes the msg elemnt from the DOM


////////Setting styles
message.style.backgroundColor = '#37383d';//////sets bachgrncolor for msg
message.style.width = '100%';
console.log(getComputedStyle(message).height);///how to get the css attributes of an elemnt 
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';///how to adjust height 

document.documentElement.style.setProperty('--color-primary', 'orangered');////changes color variable set on css root files


///////setting atributes
const logo = document.querySelector('.nav__logo');////geting the attributes of the logo
console.log(logo.alt);
console.log(logo.className);//logs the class name
console.log(logo.src);///logs relative url/web url
console.log(logo.getAttribute('src'));///logs local url/dir 

/////to change attribute
logo.alt = 'beautiful logo';///changed to new text

////to set new(fresh) attribute
logo.setAttribute('company', 'Bankist');///creates new att, company = bankist

////to get non-standard attributes(sel defined att)
logo.getAttribute('designer');/////generates the designer attribut frm logo

////////Data Atributes
console.log(logo.dataset.versionNumber); ///verify slide 6 chapter 13

//////CLASSES manipulations continues
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

///////////////////////////////////////
// CREATING BUTTON SCROLLING EFFECT ON APP
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {///adds eventlistner to btn on click to scroll to section 1
  section1.scrollIntoView({ behavior: 'smooth' });

});

////////MORE ON PAGE SCROLLING/NAVIGATION
// Page navigation for the app header navs

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();//prevents any preset settings
    const id = this.getAttribute('href');////selects only the local id name
    console.log(id);///logs id name only
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });///performs scrolling

  });
});
//OR USING
///////EVENT DELEGATION: suitable for cases where numerous elemnts re selectd for event handling
//steps involvd re:
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);/////this is the location where event actually happens
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});


////////MORE ON EVENT HANDLERS/LISTENERS
//const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {///modern
//   alert('Great you are reading the heading');
// });
//OR YOU CAN USE:
// h1.onmouseenter = function (e) {//kinda old school
//   alert('Alt: Great you are reading the heading');
// };

////OTHER EXAMPLES OF ADDING/REMOVING EVENT LISTERNERS
// const alertH1 = function (e) {
//   alert('Great you are reading the heading');
// };
// h1.addEventListener('mouseenter', alertH1);
//h1.removeEventListener('mouseenter', alertH1);///removes event listener

//setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);////remov listener after 5secs


////////////////////////////////////////
//////////////EVENT BUBBLING: this is concept of parents responding to events handled on their children 
//N/B: use the code below to stop event bubbling propagation or spread to parents
//example:
document.querySelector('.nav__link').addEventListener('mouseover', function (e) {
  this.style.backgroundColor = '#ffbb00';
  //alert('Great you are reading the heading');
  e.stopPropagation();////use to prevent parents response to events
});

//////////////////////////////////////////
///DOM TRAVERSING; means the concept of selecting an elemnt based on anothe elemnt. eg. parents and children
const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));////selects the h1 child with class highlight
console.log(h1.children);////logs all h1 children
h1.firstElementChild.style.color = 'white';///selects firstChild
h1.lastElementChild.style.color = 'blue';
console.log(h1.parentElement); //logs the parent
// h1.closest('.header').style.backgroundColor = 'var (--gradient-secondary)';////closest looks for the closest PARENT
// h1.closest('h1').style.backgroundColor = 'var (--color-tertiary)';

//////going sideways
console.log(h1.previousElementSibling);////logs the sibbling
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children);///used to log all the sibblings
console.log([...h1.parentElement.children]);////using the spred operator to put result in an array
const exp = [...h1.parentElement.children];
console.log(exp[0]);

////to work on sibblings of h1
[...h1.parentElement.children].forEach(function (el) {///changes the attributes of h1 sibblings
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

////////////////////////////
////WORKING ON THE TABBED COMPONENT(ie instant transfers, instant loans etc)
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {///selecting the parent
  const clicked = e.target.closest('.operations__tab');

  ///guardd clause
  if (!clicked) return;////means return if no clicked happend

  ///activ tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));///removs activ class 
  clicked.classList.add('operations__tab--active');///adds activ class
  console.log(clicked);

  //active content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));///remov activ class
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});


/////COMPUTING THE FADE ANIMATION OF HEADER COMPONENTS(ie features, testimonials etc)
const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');////using parent to select sibbling
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

/////////////COMPUTING THE STICKY NAV AFTER A CERTIN LEVEL OF PAGE SCROLL
// Sticky navigation: Intersection Observer API

//const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;///generates height of nav from console

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //rootMargin: '-90px'  ///height before the threshold where sticky nav looks decent to appear
  rootMargin: `-${navHeight}px`,///nav height is used to determine the exact point sticky nav wil appear(ie at point of same height remaining)
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
/*
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
*/
//////////////////////////
///COMPUTING THE SLIDER EFFECT
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(////inserts the dots into html
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {///right btn
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {///left btn
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {///creating events for using arow keys to move slides
    if (e.key === 'ArrowLeft') prevSlide();///links with left arow
    e.key === 'ArrowRight' && nextSlide();///links with right arow 
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

