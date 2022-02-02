let photoH = document.querySelectorAll('li');
let div = document.createElement('div');

function makeDiv() {
    for ( let i = 0; i < photoH.length;i++) {
        photoH.style.width = '80%';
    }
};

photoH.addEventListener('mouseenter',makeDiv,false);