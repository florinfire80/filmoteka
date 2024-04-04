import { refs } from '../refs';
import {
  getAllMoviesFromLocalStorage,
  getFromLocalStorage,
} from '../storage/ls-data-services';
import { renderMoviesDetailed } from './fnRenderMoviesDetailed';

refs.libraryBtn.addEventListener('click', onMyLibraryClick);

// Render all filtered movies from LocalStorage when clicking on My Library
function onMyLibraryClick() {
  renderMoviesDetailed(getAllMoviesFromLocalStorage());
}

function renderMoviesByPageNumber(pageNumber) {
  const movies = getAllMoviesFromLocalStorage();

  const startIndex = (pageNumber - 1) * 20;
  const moviesToRender = movies.slice(startIndex, startIndex + 20);

  renderMoviesDetailed(moviesToRender);
}

function renderWatchedMoviesByPageNumber(pageNumber) {
  const movies = getFromLocalStorage('watched');

  const startIndex = (pageNumber - 1) * 20;
  const moviesToRender = movies.slice(startIndex, startIndex + 20);

  renderMoviesDetailed(moviesToRender);
}

function renderQueueMoviesByPageNumber(pageNumber) {
  const movies = getFromLocalStorage('queue');

  const startIndex = (pageNumber - 1) * 20;
  const moviesToRender = movies.slice(startIndex, startIndex + 20);

  renderMoviesDetailed(moviesToRender);
}

export {
  onMyLibraryClick,
  renderMoviesByPageNumber,
  renderQueueMoviesByPageNumber,
  renderWatchedMoviesByPageNumber,
};
