import { refs } from '../refs';
import { genres } from '../../genres.json';

async function renderMoviesDetailed(data) {
  if (!data) {
    return;
  }
  refs.gallery.innerHTML = data
    .map(movie => {
      const imageSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '';
      const movieGenres = makeGenresArray(movie);
      const genresString = genresForFilmCard(movieGenres);

      const year = movie.release_date
        ? movie.release_date.split('-')[0]
        : 'n/a';
      return `
        <li  class='gallery__item' data-id="${movie.id}">
          <img class='gallery__item-image' alt="${movie.title}" src="${imageSrc}">
          <div class='gallery__item-description'>
            <h3 class='gallery__item-description-title' >${movie.title}</h3>
            <p class='gallery__item-description-genres' >${genresString} | ${year}</p>
          </div>
        </li>
      `;
    })
    .join('');
}

// Array for the function genresForFilmCard
function makeGenresArray(movie) {
  return movie.genres.map(genre => genre.id);
}

// Processing genre IDs and displaying their names for renderMoviesDetailed
function genresForFilmCard(genreIds) {
  const selectedGenres = genreIds
    .map(id => genres.find(genre => genre.id === id).name)
    .slice(0, 2); // Select only the first two genres

  if (selectedGenres.length < genreIds.length) {
    selectedGenres.push('Other');
  }

  return selectedGenres.join(', ');
}

export { makeGenresArray, genresForFilmCard, renderMoviesDetailed };
