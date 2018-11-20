window.addEventListener('DOMContentLoaded', setup);

function setup() {
    fetchPhotos().then(photos => {
        render(photos);
        handleSearchForm(photos);
        zoomPhoto(photos[0]);
    });
}

function fetchPhotos() {
    return fetch('/photos').then(res => res.json());
}

function removeFullPhoto(sel) {
    const $area = document.querySelector(sel);
    if ($area) {
        $area.remove();
    }
}

function displayPhotoDetails(photo) {
    removeFullPhoto('.details');
    const $area = document.getElementById('app');
    const $div = document.createElement('div');
    $div.classList.add('details');
    const template = `
        <div>
            <p>${photo.author}</p>
            <p>${photo.tags.map((x) => `#${x}`).join(', ')}</p>
            <p>${photo.title}</p>
        </div>
        `;

    $div.innerHTML = template;
    $area.appendChild($div);
}

function handleSearchForm(photos) {
    const $area = document.getElementById('app');
    const $input = document.createElement('input');
    $area.appendChild($input);

    $input.addEventListener('keypress', () => {
        let value = $input.value;
        const filteredPhotos = photos.filter((photo) =>
            photo.title.toLowerCase().match(value.toLowerCase()));
        render(filteredPhotos);
    });
}

function zoomPhoto(photo) {
    removeFullPhoto('.full');
    const $area = document.getElementById('app');
    const $zoomPhoto = document.createElement('img');
    $zoomPhoto.classList.add('full');
    $zoomPhoto.setAttribute('src', photo.image);
    $area.appendChild($zoomPhoto);
    displayPhotoDetails(photo);
}

function render(photos = []) {
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
