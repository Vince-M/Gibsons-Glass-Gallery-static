console.log('Hello');

const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const menuTopNav = document.querySelector('#menuTopNav');
const overlay = document.querySelector('#overlay');
const breakpoint = window.matchMedia('(width < 43.75em)');

const setupTopNav = () => {
    if (breakpoint.matches) {
    console.log('is mobile');
    menuTopNav.setAttribute('inert', '');
  } else {
    console.log('is tablet/desktop');
    menuTopNav.removeAttribute('inert');
  }
};

setupTopNav();

btnOpen.addEventListener('click', openMobileMenu);
btnClose.addEventListener('click', closeMobileMenu);

breakpoint.addEventListener('change', () => {
 console.log('breakpoint crossed');
 setupTopNav();
});

function openMobileMenu() {
  console.log('run openMobileMenu');
  btnOpen.setAttribute('aria-expanded', 'true');
  menuTopNav.removeAttribute('inert');
  menuTopNav.style.transitionDuration = '400ms';
  overlay.style.transitionDuration = '400ms';
}

function closeMobileMenu() {
  console.log('run closeMobileMenu');
  btnOpen.setAttribute('aria-expanded', 'false');
  menuTopNav.setAttribute('inert', '');
  
  setTimeout(() => {
    menuTopNav.removeAttribute('style');
    overlay.removeAttribute('style');
  }, 500);
}

