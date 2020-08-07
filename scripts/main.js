let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc == 'images/wood-frog.png') {
        myImage.setAttribute('src', 'images/wood-frog02.jpg');
    } else {
        myImage.setAttribute('src', 'images/wood-frog.png');
    }
}

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
    let myLocation = prompt('Please enter your location.');
    if(!myLocation) {
        setUserName();
    } else {
        localStorage.setItem('location', myLocation);
        myHeading.textContent = 'Wildlife in ' + myLocation;
    }
}

if(!localStorage.getItem('location')) {
    setUserName();
} else {
    let storedLocation = localStorage.getItem('location');
    myHeading.textContent = 'Wildlife in ' + storedLocation;
}

myButton.onclick = function() {
    setUserName();
};