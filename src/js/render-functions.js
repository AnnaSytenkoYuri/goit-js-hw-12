import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.load-more-btn')

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
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
      }) =>
        `<div class="gallery-list">
          <a class="gallery-item" href="${largeImageURL}">
          <div class="cart-item">
            <img src="${webformatURL}" alt="${tags}" loading="lazy">
              <div class="info">
                <p class="info-item"><b>Likes:</b>${likes}</p>
                <p class="info-item"><b>Views:</b>${views}</p>
                <p class="info-item"><b>Comments:</b>${comments}</p>
                <p class="info-item"><b>Downloads:</b>${downloads}</p>
              </div>
            </div>
          </a>
        </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}
export function showLoadMoreButton() {
    loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.add('hidden');
}