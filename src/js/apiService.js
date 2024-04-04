import axios from 'axios';
import { BASE_URL, API_KEY } from './settings';
import { showLoader, hideLoader } from './loader';

export default class MovieApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async fetchData(url) {
    try {
      showLoader(); // Show loader before making the request
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error for handling by the caller
    } finally {
      hideLoader(); // Hide loader regardless of success or failure
    }
  }

  async getTrendingMovies() {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;
    return this.fetchData(url).then(data => data.results);
  }

  async searchMovies(query, page = 1) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    return this.fetchData(url).then(data => data.results);
  }

  async getMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    return this.fetchData(url);
  }

  async getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    return this.fetchData(url).then(data => data.genres);
  }

  setQuery(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
