import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showErrorMessage,
} from './js/render-functions.js';

const form = document.querySelector('.form');

function onSubmitForm(event) {
  event.preventDefault();
  clearGallery();

  const searchEl = form.elements['search-text'].value.trim();
  if (!searchEl) {
    showErrorMessage('Please enter a search query.');
    form.elements['search-text'].value = '';
    return;
  }
  showLoader();

  fetchImages(searchEl)
    .then(data => {
      hideLoader();
      if (data.hits.length === 0) {
        showErrorMessage(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      } else {
        renderGallery(data.hits);
      }
    })
    .catch(error => {
      hideLoader();
      showErrorMessage(error.message);
    })
    .finally(() => form.reset());
}

form.addEventListener('submit', onSubmitForm);
