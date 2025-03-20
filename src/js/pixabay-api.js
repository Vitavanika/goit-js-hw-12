import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49273280-4949489e1de14adfdaf44ac08';

axios.defaults.baseURL = BASE_URL;

export async function fetchImages(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  try {
    const response = await axios.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
