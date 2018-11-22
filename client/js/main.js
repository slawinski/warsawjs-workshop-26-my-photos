window.addEventListener('DOMContentLoaded', setup);

function setup() {
    const $area = document.getElementById('app');
    $area.classList.add('red');
    $area.style.height = '100vh';
    renderHeader($area);
    fetchPhotos().then((photos) => {
        renderGallery(photos, $area);
        handleSearchForm(photos, $area);
        zoomPhoto(photos[0], $area);
    });
}

function renderHeader($area) {
    const $container = document.createElement('div');
    $container.classList.add('container');
    const $header = document.createElement('h1');
    $header.classList.add('brutal-text');
    $header.style.margin = '0';
    const $title = document.createTextNode('Brutal Photo Gallery');
    $area.appendChild($container);
    $container.appendChild($header);
    $header.appendChild($title);

}

function renderSubtitle($text, $container) {
    const $header = document.createElement('h4');
    $header.classList.add('border-dotted-fat');
    const $subtitle = document.createTextNode($text);
    $container.appendChild($header);
    $header.appendChild($subtitle);
}

function fetchPhotos() {
    return fetch('/photos').then(res => res.json());
}

function handleSearchForm(photos, $area) {
    const $container = document.createElement('div');
    $container.classList.add('container');
    $area.appendChild($container);
    const $text = 'The Search Field';
    renderSubtitle($text, $container);
    const $input = document.createElement('input');
    $input.classList.add('border', 'border-dashed-thin', 'blue-text', 'banana', 'bigger');
    $container.appendChild($input);
    renderButton($container);

    $input.addEventListener('keypress', () => {
        let value = $input.value.toLowerCase();
        const filteredPhotos = photos.find((photo) => {
            const titleMatch = photo.title.toLowerCase().match(value);
            const authorMatch = photo.author.toLowerCase().match(value);
            return titleMatch || authorMatch;
        });
        zoomPhoto(filteredPhotos, $area);
    });
}

function renderButton($container) {
    const $button = document.createElement('button');
    $button.classList.add('glitch', 'black', 'yellow-text', 'flow-text');
    const $text = document.createTextNode('Search');
    $button.appendChild($text);
    $container.appendChild($button);
}


function renderGallery(photos, $area) {
    const $container = document.createElement('div');
    $container.classList.add('container');
    $area.appendChild($container);
    const $text = 'The Pitcture List';
    renderSubtitle($text, $container);
    photos.forEach(photo => {
        const $image = document.createElement('img');
        $image.setAttribute('src', photo.thumb);
        $image.addEventListener('click', () => {
            zoomPhoto(photo, $area);
        });
        $container.appendChild($image);
    });
}

function removeFullPhoto(sel) {
    const $area = document.querySelector(sel);
    if ($area) {
        $area.remove();
    }
}

function zoomPhoto(photo, $area) {
    const $container = document.createElement('div');
    $container.classList.add('container');
    $area.appendChild($container);
    removeFullPhoto('.full');
    const $photoContainer = document.createElement('div');
    $photoContainer.style.position = 'relative';
    $container.appendChild($photoContainer);
    const $zoomPhoto = document.createElement('img');
    $zoomPhoto.classList.add('full');
    $zoomPhoto.setAttribute('src', photo.image);
    $photoContainer.appendChild($zoomPhoto);
    displayPhotoDetails(photo, $photoContainer);
}

function displayPhotoDetails(photo, $photoContainer) {
    removeFullPhoto('.details');
    const $div = document.createElement('div');
    $div.classList.add('details', 'lime-text-shadow');
    $div.style.position = 'absolute';
    $div.style.left = '0px';
    $div.style.top = '0px';
    const template = `
        <div>
            <p>${photo.author}</p>
            <p>${photo.tags.map((x) => `#${x}`).join(', ')}</p>
            <p>${photo.title}</p>
        </div>
        `;
    $div.innerHTML = template;
    $photoContainer.appendChild($div);
}
