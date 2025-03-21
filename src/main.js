import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  showMessage,
} from './js/render-functions.js';
import iconCaution from './img/caution.svg';

const infoMsg = {
  iconUrl: iconCaution,
  backgroundColor: '#4e75ff',
  title: '',
};

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-button');
const gallery = document.querySelector('.gallery');
const backToTopBtn = document.getElementById('backBtn');
let searchQuery = '';
let page;
let totalHits;

async function handleSearch(event, loadMore = false) {
  if (event) {
    event.preventDefault();
  }

  if (!loadMore) {
    page = 1;
    clearGallery();
    hideLoadMoreBtn();
    searchQuery = form.elements['search-text'].value.trim();

    if (!searchQuery) {
      showMessage('Please enter a search query.');
      if (event) {
        form.elements['search-text'].value = '';
      }
      return;
    }
  } else {
    page += 1;
  }

  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await fetchImages(searchQuery, page);
    hideLoader();
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideLoadMoreBtn();
    } else {
      renderGallery(data.hits);

      if (loadMore) {
        const firstCard = gallery.firstElementChild;
        if (firstCard) {
          const { height: cardHeight } = firstCard.getBoundingClientRect();
          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        }
      }

      if (page * 15 < totalHits) {
        showLoadMoreBtn();
      } else {
        hideLoadMoreBtn();
        if (loadMore) {
          showMessage(
            "We're sorry, but you've reached the end of search results.",
            infoMsg
          );
        }
      }
    }
  } catch (error) {
    hideLoader();
    showMessage(error.message);
  } finally {
    if (event) {
      form.reset();
    }
  }
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', event => handleSearch(event, false));
loadMoreBtn.addEventListener('click', () => handleSearch(null, true));
window.addEventListener('scroll', scrollFunction);
backToTopBtn.addEventListener('click', scrollToTop);
