import { refs } from '../refs';
import MovieApi from '../apiService';
import { renderMovies } from '../card-film-render';

const movieApi = new MovieApi();

async function onHomeBtn() {
  try {
    const movies = await movieApi.getTrendingMovies();
    renderMovies(movies);
    makeHomeActive();
    refs.searchInput.value = '';
  } catch (error) {
    console.error('Error loading trend movies:', error);
  }
}

function makeHomeActive() {
  // Adăugăm clasa 'active' pe butonul Home și o eliminăm de pe butonul My Library
  refs.homeBtn.classList.add('active');
  refs.libraryBtn.classList.remove('active');

  // Ascundem meniul My Library și afișăm câmpul de căutare
  refs.libButtons.classList.add('is-hidden');
  refs.searchInput.classList.remove('is-hidden');

  // Deselectăm butoanele Watched și Queue dacă sunt selectate
  refs.watchedBtn.classList.remove('active');
  refs.queueBtn.classList.remove('active');
}

function makeMyLibraryActive() {
  // Adăugăm clasa 'active' pe butonul My Library și o eliminăm de pe butonul Home
  refs.libraryBtn.classList.add('active');
  refs.homeBtn.classList.remove('active');

  // Afișăm meniul My Library și ascundem câmpul de căutare
  refs.libButtons.classList.remove('is-hidden');
  refs.searchInput.classList.add('is-hidden');
}

export { makeHomeActive, makeMyLibraryActive, onHomeBtn };
