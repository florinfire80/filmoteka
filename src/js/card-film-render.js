import { refs } from './refs';
import MovieApi from './apiService';
import noPoster from './../img/no-poster.jpg';
import '../sass/_gallery.scss';

// Movie card rendering
export function renderMovies(data) {
  if (!data) {
    return;
  }
  Promise.all(data.map(createRenderMovies)).then(htmlArray => {
    refs.gallery.innerHTML = htmlArray.join('');
  });
}

// Creating HTML markup for a card
async function createRenderMovies(movie) {
  const imageSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : noPoster;
  const genres = await generateGenresFromGetApi(movie.genre_ids);
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'n/a';
  return `
     <li class='gallery__item' data-id="${movie.id}">
      <img class='gallery__item-image' alt="${movie.title}" src="${imageSrc}">
      <div class='gallery__item-description'> 
        <h3 class='gallery__item-description-title'>
        ${movie.title}
        </h3>
        <p class='gallery__item-description-genres'>
        ${genres.slice(0, 2).concat('...').join(', ')}
         | ${year}
        </p> 
      </div>
   </li>
    `;
}

// Generating genres using a get request
async function generateGenresFromGetApi(genreIds) {
  const movieApi = new MovieApi();
  const genresArray = await movieApi.getGenres();
  const genres = genreIds.map(genreId => {
    const genre = genresArray.find(({ id }) => id === genreId).name;
    return genre;
  });

  return genres;
}
