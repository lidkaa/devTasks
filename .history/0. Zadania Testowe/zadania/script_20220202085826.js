let photoH = document.querySelectorAll('.cell');
let div = document.createElement('div');

photoH.addEventListener('mouseenter', function(){
this.target.style.color = 'purple';
console.log('dziaa');
},false);
