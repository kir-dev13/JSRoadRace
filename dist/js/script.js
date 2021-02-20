"use strict";
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
;
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
;
