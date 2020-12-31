const page = document.querySelector('.page');
const navbar = document.querySelector('.nav__list');
const ham = document.querySelector('.nav__menu-btn');
const navLinks = document.querySelectorAll('.nav__links');
const navList = document.querySelector('.nav__list');
const navLogo = document.querySelector('.nav__logo');
const content = document.querySelector('.content');

const dim = createDim();

const closeMenuListener = (e) => {
    if (e.target == navList) {
        e.target.setAttribute('hidden', true);
        e.target.removeEventListener('transitionend', closeMenuListener);
    }
}

ham.addEventListener('click', toggleHamburger);
dim.addEventListener('click', closeHamburger);
window.addEventListener('resize', closeHamburger);


function toggleHamburger() {
    addNavListMobile();
    showMenu();
    addDim();
    disableScroll();
    blurBackground();
}

function closeHamburger() { 
    removeNavListMobile(); 
    closeMenu();   
    removeDim();
    enableScroll();
    clearBackground();
}

function showMenu() {
    navList.removeEventListener('transitionend', closeMenuListener);    
    navList.removeAttribute('hidden');
    const reflow = navList.offsetHeight;
    navList.classList.add('nav__list--is-open')
}

function closeMenu() {
    navList.addEventListener('transitionend', closeMenuListener);
    navList.classList.remove('nav__list--is-open')
}

function addNavListMobile() {
    navList.classList.add('nav__list--mobile');
}

function removeNavListMobile() {
    const timeoutDuration = 200;

    const timeout = setTimeout(() => {
        navList.classList.remove('nav__list--mobile');
    }, timeoutDuration);
}


function createDim() {
    const div = document.createElement('div');
    div.classList.add('dim');
    return div;
}

function addDim() {
    page.insertBefore(dim, null);
}

function removeDim() {
    dim.remove();
}

function disableScroll() {
    page.classList.add('stop-scrolling');
}

function enableScroll() {
    page.classList.remove('stop-scrolling');
}

function blurBackground() {
    content.classList.add('blur');
    navLogo.classList.add('blur');
}

function clearBackground() {
    content.classList.remove('blur');
    navLogo.classList.remove('blur');
}