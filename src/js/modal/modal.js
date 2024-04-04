import MovieApi from '../apiService';
import { refs } from '../refs';
import { modalCard } from './modal-card-layout';
import {
  closeModalOnBgClick,
  closeModalOnEsc,
  closeModalOnBtnClick,
} from './modal-close-functions';
import {
  onModalBtnClick,
  toggleModalBtnsDisplay,
} from './modal-btns-functions';

const api = new MovieApi();

refs.gallery.addEventListener('click', async e => {
  const targetLi = e.target.closest('li');
  if (!targetLi) return;

  const targetId = targetLi.dataset.id;
  const movie = await api.getMovieDetails(targetId);

  refs.modalContent.innerHTML = modalCard(movie);
  refs.modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  const addToWatchedBtn = refs.modalContent.querySelector('.addWatched');
  const addToQueueBtn = refs.modalContent.querySelector('.addQueue');

  toggleModalBtnsDisplay(targetId, addToWatchedBtn, addToQueueBtn);

  refs.modalContent.addEventListener('click', e => onModalBtnClick(e, movie));
});

refs.closeBtn.addEventListener('click', closeModalOnBtnClick);
window.addEventListener('click', closeModalOnBgClick);
document.addEventListener('keydown', closeModalOnEsc);
