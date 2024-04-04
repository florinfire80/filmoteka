import Pagination from 'tui-pagination';
import { refs } from './refs';
import MovieApi from './apiService';
import { renderMovies } from './card-film-render';
import {
  renderMoviesByPageNumber,
  renderQueueMoviesByPageNumber,
  renderWatchedMoviesByPageNumber,
} from './library/initial-library-render';
import {
  getAllMoviesFromLocalStorage,
  getFromLocalStorage,
} from './storage/ls-data-services';
import {
  makeHomeActive,
  makeMyLibraryActive,
} from './nav-bar/nav-btns-functions';

const movieApi = new MovieApi();

const pageTemplate = '<a href="#" class="tui-page-btn">{{page}}</a>';
const currentPageTemplate =
  '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>';
const moveButtonTemplate =
  '<a href="#" class="tui-page-btn tui-{{type}}">' +
  '<span class="tui-ico-{{type}}">{{type}}</span>' +
  '</a>';
const disabledMoveButtonTemplate =
  '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
  '<span class="tui-ico-{{type}}">{{type}}</span>' +
  '</span>';
const moreButtonTemplate =
  '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
  '<span class="tui-ico-ellip">...</span>' +
  '</a>';

const pagination = new Pagination(refs.pagContainer, {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: pageTemplate,
    currentPage: currentPageTemplate,
    moveButton: moveButtonTemplate,
    disabledMoveButton: disabledMoveButtonTemplate,
    moreButton: moreButtonTemplate,
  },
});

let totalMovies = 400;
pagination.reset(totalMovies);

// Home page pagination
refs.homeBtn.addEventListener('click', activateHomePagination);

async function activateHomePagination() {
  pagination.reset(400);
  pagination.on('beforeMove', async event => {
    const query = refs.searchInput.value.trim();
    makeHomeActive();
    const movies = query
      ? await movieApi.getSearchMoviesForPagination(query, event.page)
      : await movieApi.getMoviesForPagination(event.page);
    renderMovies(movies);
  });
}

// Library pagination
refs.libraryBtn.addEventListener('click', activateLibraryPagination);

function activateLibraryPagination() {
  refs.watchedBtn.classList.remove('active');
  refs.queueBtn.classList.remove('active');

  const totalMovies = getAllMoviesFromLocalStorage().length;
  pagination.reset(totalMovies);

  pagination.on('beforeMove', event => {
    makeMyLibraryActive();
    refs.homeBtn.classList.remove('active');
    renderMoviesByPageNumber(event.page);
  });
}

// Queue pagination
refs.queueBtn.addEventListener('click', activateQueuePagination);

function activateQueuePagination() {
  const queue = getFromLocalStorage('queue');
  pagination.reset(queue.length);

  pagination.on('beforeMove', event => {
    renderQueueMoviesByPageNumber(event.page);
  });
}

// Watched pagination
refs.watchedBtn.addEventListener('click', activateWatchedPagination);

function activateWatchedPagination() {
  const watched = getFromLocalStorage('watched');
  pagination.reset(watched.length);

  pagination.on('beforeMove', event => {
    renderWatchedMoviesByPageNumber(event.page);
  });
}
