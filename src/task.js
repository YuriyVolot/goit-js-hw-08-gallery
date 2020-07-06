import galleryItems from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    overlay: document.querySelector('.lightbox__content'),
    modalImg: document.querySelector('.lightbox__image'),
    closeModalBtn: document.querySelector(
        'button[data-action="close-lightbox"]',
    ),
};

refs.gallery.addEventListener('click', handleImgClick);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.overlay.addEventListener('click', handleOverlayClick);

const galleryMarkup = galleryItems.reduce((acc, item) => {
    const itemMarkup = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
  </li>`;

    acc += itemMarkup;

    return acc;
}, '');

refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

function handleImgClick(event) {
    event.preventDefault();
    if (event.target === event.currentTarget) {
        return;
    }

    refs.modalImg.src = event.target.dataset.source;
    refs.modalImg.alt = event.target.getAttribute('alt');

    refs.modal.classList.add('is-open');
    window.addEventListener('keydown', handleKeyPress);
}

function closeModal() {
    refs.modal.classList.remove('is-open');
    refs.modalImg.src = '';
    refs.modalImg.alt = '';
    window.removeEventListener('keydown', handleKeyPress);
}

function handleOverlayClick(event) {
    if (event.target !== event.currentTarget) {
        return;
    }

    closeModal();
}

function handleKeyPress(event) {
    if (event.code !== 'Escape') {
        return;
    }

    closeModal();
}
