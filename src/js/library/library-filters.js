import { refs } from '../refs';
import { toggleActiveClass } from './fnToggleActiveClass';
import { getFromLocalStorage } from '../storage/ls-data-services';
import { renderMoviesDetailed } from './fnRenderMoviesDetailed';

refs.libButtons.addEventListener('click', onLibraryBtnClick);

async function onLibraryBtnClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const currentActiveTarget = refs.libButtons.querySelector('.active');
  const selectedTarget = event.target;
  const moviesFromStorage = getFromLocalStorage(
    selectedTarget.textContent.toLowerCase()
  );
  await toggleActiveClass(currentActiveTarget, selectedTarget);
  renderMoviesDetailed(moviesFromStorage);
}
