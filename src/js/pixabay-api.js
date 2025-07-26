import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19018033-87a1a51fb4261bc6ee99901a2';

const PER_PAGE = 15;
export let page = 1;

export async function getImagesByQuery(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: PER_PAGE,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Помилка при отриманні зображень:', error.message);
    throw error;
  }
};
 export function resetPage() {
    page = 1;
 }

 export function incrementPage() {
    page++;
 }
