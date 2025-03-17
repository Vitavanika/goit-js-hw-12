import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49273280-4949489e1de14adfdaf44ac08';

axios.defaults.baseURL = BASE_URL;

export async function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get('', { params })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
