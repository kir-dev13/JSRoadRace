const checkboxMusic = document.querySelector("#checkbox-music");
// checkboxMusic.checked = getBooleanDataFromSessionStorage("checkboxMusic");

const checkboxSound = document.querySelector("#checkbox-sound");
checkboxSound.checked = getBooleanDataFromSessionStorage("checkboxSound", true);

const soundControlBar = document.querySelector(".sound__volume");
setSoundControlBar();

const startBtn = document.querySelector(".game-area__button");
startBtn.y = 20;
const gameArea = document.querySelector(".game-area");
const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");
const title = document.querySelector(".game__title");
const titleWord = title.querySelector(".title__word");
const titleWords = title.querySelectorAll(".title__word");
const userName = document.querySelector(".input__user-name");
const scoreView = rightSide.querySelector(".score");
let windowHeight;
