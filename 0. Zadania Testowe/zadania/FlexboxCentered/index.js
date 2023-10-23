let data;
const imagesList = () => {
    fetch('https://picsum.photos/v2/list?page=2&limit=9')
        .then(res => res.json())
        .then(data => console.log(data))
}

(async () => {
    imagesList()
        .then(() => console.log(data))
})()

const images = document.querySelectorAll('img');

