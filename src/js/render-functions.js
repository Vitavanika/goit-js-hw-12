import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iconWarning from '../img/warning.svg';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-button');
let lightbox;

export function renderGallery(images) {
  try {
    const markup = images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `
          <div class="photo-card">
            <a class="photo-link" href="${largeImageURL}" title="${tags}">
              <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy">
              <div class="info">
                  <p class="info-item">Likes<span>${likes}</span></p>
                  <p class="info-item">Views<span>${views}</span></p>
                  <p class="info-item">Comments<span>${comments}</span></p>
                  <p class="info-item">Downloads<span>${downloads}</span></p>
              </div>
            </a>
          </div>`
      )
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);

    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery a');
    }
  } catch (error) {
    showMessage('Failed to render gallery.');
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
  loader.innerHTML = '';
}

export function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'flex';
}

export function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

export function showMessage(message, options = {}) {
  const {
    title = 'Error',
    backgroundColor = '#ef4040',
    ...restOptions
  } = options;

  iziToast.show({
    title: title,
    titleColor: '#fff',
    message: message,
    messageColor: '#fff',
    backgroundColor: backgroundColor,
    iconUrl: iconWarning,
    iconColor: '#fff',
    position: 'topRight',
    timeout: 3000,
    maxWidth: '432px',
    ...restOptions,
  });
}
