import { refs } from '../refs';
import { onHomeBtn, makeMyLibraryActive } from './nav-btns-functions';

// "HOME"
refs.homeBtn.addEventListener('click', onHomeBtn);
// "MY LIBRARY"
refs.libraryBtn.addEventListener('click', makeMyLibraryActive);

refs.logo.addEventListener('click', onHomeBtn);
