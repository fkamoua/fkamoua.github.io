const page = document.querySelector('.page');
const navbar = document.querySelector('.nav__list');
const ham = document.querySelector('.nav__menu-btn');
const navLinks = document.querySelectorAll('.nav__links');

const dim = createDim();

ham.addEventListener('click', toggleHamburger);
dim.addEventListener('click', closeHamburger);

window.addEventListener('resize', closeHamburger);

function toggleHamburger() {
    navbar.style.visibility = 'visible';
    Object.keys(navLinks).map(function (key, index) {
        navLinks[key].classList.add('nav__links--mobile');
    });
    page.insertBefore(dim, null);
}

function closeHamburger() {
    navbar.style.visibility = 'hidden';
    Object.keys(navLinks).map(function (key, index) {
        navLinks[key].classList.remove('nav__links--mobile');
    });
    removeDim();
}

function createDim() {
    const div = document.createElement('div');
    div.classList.add('dim');
    return div;
}

function removeDim() {
    dim.remove();
}


