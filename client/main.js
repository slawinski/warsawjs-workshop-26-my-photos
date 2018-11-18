window.addEventListener('DOMContentLoaded', setup);

function setup() {
    fetchPhotos().then(photos => {
        render(photos);
        console.log(photos);
        zoomPhoto(photos[0]);
    });
}

function fetchPhotos() {
    return fetch('/photos').then(res => res.json());
}

function removeFullPhoto() {
    const $area = document.querySelector('.full');
    if ($area) {
        $area.remove();
    }
}

function displayPhotoDetails(photo) {
    const $area = document.getElementById('app');
    let template = document.createElement('div');
    template = `
        <div>
            <p>${photo.author}</p>
            <p>${photo.tags.map((x) => `#${x}`).join(', ')}</p>
            <p>${photo.title}</p>
        </div>
        `;
    $area.innerHTML += template;
}

function zoomPhoto(photo) {
    removeFullPhoto();
    const $area = document.getElementById('app');
    const $zoomPhoto = document.createElement('img');
    $zoomPhoto.classList.add('full');
    $zoomPhoto.setAttribute('src', photo.image);
    $area.appendChild($zoomPhoto);
    displayPhotoDetails(photo);
}

function render(photos) {
    const $area = document.getElementById('app');
    photos.forEach(photo => {
        const $image = document.createElement('img');
        $image.setAttribute('src', photo.thumb);
        $image.addEventListener('click', () => {
            zoomPhoto(photo);
        });
        $area.appendChild($image);
    });
}
