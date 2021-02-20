function checkboxChecked(params) {
  let musicSelectors = document.querySelectorAll(".music__radio");
  let checkboxMusic = document.querySelector("#checkbox-music");
  if (checkboxMusic.checked) {
    console.log("Выбран");
    musicSelectors.forEach((elem) => elem.removeAttribute("disabled"));
  } else {
    musicSelectors.forEach((elem) => {
      elem.setAttribute("disabled", "disabled");
      elem.removeAttribute("checked");
    });
    console.log("Не Выбран");
  }
}
