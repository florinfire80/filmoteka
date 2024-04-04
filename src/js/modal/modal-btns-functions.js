import {
  addToLocalStorage,
  checkMovieLocationById,
} from '../storage/ls-data-services';

function onModalBtnClick(e, movie) {
  const addWatched = document.querySelector('.addWatched');
  const addQueue = document.querySelector('.addQueue');

  if (e.target.matches('.addWatched')) {
    onAddToWatchedClick(movie, addWatched, addQueue);
  } else if (e.target.matches('.addQueue')) {
    onAddToQueueClick(movie, addWatched, addQueue);
  }
}

function onAddToWatchedClick(movieData, addWatched, addQueue) {
  addToLocalStorage('watched', movieData, 'watched');
  hideQueue(addWatched, addQueue);
}

function toggleModalBtnsDisplay(id, addWatched, addQueue) {
  if (checkMovieLocationById(id) === 'queue') {
    hideWatched(addWatched, addQueue);
  }
  if (checkMovieLocationById(id) === 'watched') {
    hideQueue(addWatched, addQueue);
  }
}

function onAddToQueueClick(movieData, addWatched, addQueue) {
  addToLocalStorage('queue', movieData, 'queue');
  hideWatched(addWatched, addQueue);
}

function hideQueue(addWatched, addQueue) {
  addWatched.classList.add('lss');
  addWatched.textContent = 'Added to Watched';
  addQueue.classList.add('is-hidden');
}

function hideWatched(addWatched, addQueue) {
  addQueue.classList.add('lss');
  addQueue.textContent = 'Added to Queue';
  addWatched.classList.add('is-hidden');
}

export {
  onAddToQueueClick,
  onAddToWatchedClick,
  onModalBtnClick,
  hideQueue,
  hideWatched,
  toggleModalBtnsDisplay,
};
