export function toggleActiveClass(currentActiveTarget, selectedTarget) {
  if (currentActiveTarget) {
    currentActiveTarget.classList.remove('active');
  }
  selectedTarget.classList.add('active');
  selectedTarget.dataset.tag = selectedTarget.innerText.trim().toLowerCase();
}
