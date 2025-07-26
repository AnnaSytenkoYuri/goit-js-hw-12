import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  getImagesByQuery,
  incrementPage,
  page,
  resetPage,
} from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  loadMoreBtn,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
let currentQuery = '';

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }
  currentQuery = query;
  resetPage();
  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery);
    createGallery(data.hits);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    } else {
      incrementPage();
      showLoadMoreButton();
    }
    form.reset();
  } catch (error) {
    hideLoader();
    hideLoadMoreButton();
    console.error(error);
  }
}

loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onLoadMoreClick() {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery);
    createGallery(data.hits);
    hideLoader();

    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / 15);
    if (page >= totalPages) {
      iziToast.warning({
        message:
          'We are sorry, but you have reached the end of search results.',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    } else {
      incrementPage();
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    hideLoadMoreButton();
    console.error(error);
  }
}

function smoothScroll() {
    const galleryFirstCard = document.querySelector('.gallery .gallery-item');
    if (galleryFirstCard) {
      const cardHeight = galleryFirstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }
