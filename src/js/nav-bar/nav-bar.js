import { refs } from '../refs';
import { onHomeBtn, makeMyLibraryActive } from './nav-btns-functions';

// Event handler for the "HOME" button
refs.homeBtn.addEventListener('click', onHomeBtn);

// Event handler for the "MY LIBRARY" button
refs.libraryBtn.addEventListener('click', makeMyLibraryActive);

// Logo event handler
refs.logo.addEventListener('click', onHomeBtn);
