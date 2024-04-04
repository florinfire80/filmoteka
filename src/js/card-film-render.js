import { refs } from './refs';
import MovieApi from './apiService';
import noPoster from './../img/no-poster.jpg';
import '../sass/_gallery.scss';

// Movie card rendering
export function renderMovies(data) {
  if (!data || !Array.isArray(data)) {
    return;
  }
  const htmlArray = data.map(createRenderMovies);
  Promise.all(htmlArray).then(htmlStrings => {
    refs.gallery.innerHTML = htmlStrings.join('');
  });
}

// Creating HTML markup for a card
async function createRenderMovies(movie) {
  const imageSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : noPoster;
  const genres = await generateGenresFromGetApi(movie.genre_ids);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'n/a';

  return `
    <li class='gallery__item' data-id="${movie.id}">
      <img class='gallery__item-image' alt="${movie.title}" src="${imageSrc}">
      <div class='gallery__item-description'> 
        <h3 class='gallery__item-description-title'>${movie.title}</h3>
        <p class='gallery__item-description-genres'>${genres
          .slice(0, 2)
          .join(', ')}${genres.length > 2 ? ', ...' : ''} | ${year}</p> 
      </div>
    </li>
  `;
}

// Generating genres using a get request
async function generateGenresFromGetApi(genreIds) {
  if (!generateGenresFromGetApi.cachedGenres) {
    const movieApi = new MovieApi();
    generateGenresFromGetApi.cachedGenres = await movieApi.getGenres();
  }

  const genresArray = generateGenresFromGetApi.cachedGenres;
  const genres = genreIds.map(genreId => {
    const genre = genresArray.find(({ id }) => id === genreId)?.name;
    return genre || 'Unknown';
  });

  return genres;
}
