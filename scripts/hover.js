const links = document.getElementsByTagName('a');
const temp = document.querySelector('.projects__name');



const removeOpacity = (e) => {
    e.target.classList.remove('a--opacity');
};


for (const v of links) {
    v.addEventListener('transitionend', (e) => {
        console.log('end');
        if(e.target.addEventListener('mouseout', removeOpacity(e))) {
            e.target.removeEventListener('mouseout', removeOpacity(e));
        }

    });
    v.addEventListener('mouseover', (e) => e.target.classList.add('a--opacity'));
}
