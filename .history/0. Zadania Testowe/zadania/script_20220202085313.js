let photoH = document.querySelector('.cell');
let div = document.createElement('div');

photoH.addEventListener('mouseenter', function(event){
    event.target.style.width = '80%';
    event.target.style.height = '80%';
    console.log('dziaa');
},false);
