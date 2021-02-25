function displayHint(hintClass) {
  document.querySelector(`.hint__${hintClass}`).style.display = "block";
}
function hideHint(hintClass) {
  document.querySelector(`.hint__${hintClass}`).style.display = "none";
}
