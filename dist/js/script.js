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
function displayHint(hintClass) {
  document.querySelector(`.hint__${hintClass}`).style.display = "block";
}
function hideHint(hintClass) {
  document.querySelector(`.hint__${hintClass}`).style.display = "none";
}
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
      // elem.removeAttribute("checked");
    });
    console.log("Не Выбран");
  }
}
;
const startBtn = document.querySelector(".game-area__button");
startBtn.y = 20;
const gameArea = document.querySelector(".game-area");
let title = document.querySelector(".game__title");
let titleWord = title.querySelector(".title__word");
let titleWords = title.querySelectorAll(".title__word");
const userName = document.querySelector(".input__user-name");
// Элементы страницы

let windowHeight = document.documentElement.clientHeight;

const car = document.createElement("div");

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};

const gameSetting = {
    play: false,
    score: 0,
    speed: 3,
    boost: 2,
};

const player = {
    speed: 0,
    movePlayer(event) {
        if (keys.ArrowLeft && this.x > 0) {
            this.x -= this.speed / 2;
            car.style.transform = "rotate(-10deg)";
        }
        if (
            keys.ArrowRight &&
            this.x < gameArea.offsetWidth - car.offsetWidth
        ) {
            this.x += this.speed / 2;
            car.style.transform = "rotate(10deg)";
        }
        if (!keys.ArrowRight && !keys.ArrowLeft) {
            car.style.transform = "rotate(0deg)";
        }
        // if (keys.ArrowUp) {
        //     gameSetting.speed += 2;
        // }

        this.render();
    },
    render() {
        car.style.left = this.x + "px";
    },
};

startBtn.addEventListener("click", startGame);

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function moveElement() {
    startBtn.y += player.speed;
    startBtn.style.top = startBtn.y + "px";
    // console.log(startBtn.y);
    if (startBtn.y >= document.documentElement.clientHeight) {
        startBtn.remove();
    }
}

function prepareToStart() {
    let heightStartBtn = startBtn.offsetHeight;
    // console.log(heightStartBtn);
    startBtn.innerHTML = "";
    startBtn.style.height = heightStartBtn + "px";
    titleWords.forEach((word) => (word.innerText = ""));

    createRoadMarks(); // создание полосок

    gameArea.appendChild(car);
    car.classList.add("car");
    car.style.left = car.offsetLeft - car.offsetWidth / 2 + "px"; // создание машины

    player.x = car.offsetLeft;
    player.render();
    title.style.fontSize = "6rem";
    titleWord.innerHTML = "3";
    setTimeout(() => {
        titleWord.innerHTML = "2";
    }, 1000);
    setTimeout(() => {
        titleWord.innerHTML = "1";
    }, 2000);
}

function createRoadMarks() {
    // console.log(windowHeight);
    for (let i = 0; i < 20; i++) {
        const roadMark = document.createElement("div");
        roadMark.classList.add("road-mark");
        roadMark.style.height = windowHeight / 15 + "px";
        roadMark.y = i * ((4 * windowHeight) / 20);
        roadMark.style.top = roadMark.y + "px";
        gameArea.appendChild(roadMark);
        // console.log(roadMark);
        if (i === 9) {
            roadMark.style.backgroundColor = "grey";
        }
    }
}

function moveRoad() {
    let lines = document.querySelectorAll(".road-mark");
    // console.log(lines);
    lines.forEach(function (line) {
        line.y += player.speed;
        line.style.top = line.y + "px";
        // console.log(line.y);
        if (line.y >= document.documentElement.clientHeight) {
            // line.y = -((3 * windowHeight) / 20);
            line.y = -((3 * windowHeight) / 20 + 35);
        }
    });
}

function startRun(event) {
    event.preventDefault();
    // console.log("start");
    keys[event.key] = true;
    switch (event.keyCode) {
        case 38:
            if (event.repeat) {
                break;
            }
            player.speed += gameSetting.boost;
            break;
        case 40:
            if (event.repeat) {
                break;
            }
            player.speed -= gameSetting.boost - 1;
            break;
    }
}
function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
    switch (event.keyCode) {
        case 38:
            if (event.repeat) {
                break;
            }
            player.speed -= gameSetting.boost;
            break;
        case 40:
            if (event.repeat) {
                break;
            }
            player.speed += gameSetting.boost - 1;
            break;
    }
    // console.log("stop");
}

function startGame() {
    if (!userName.value) {
        userName.value = "player";
    }
    player.name = userName.value.capitalize();
    userName.disabled = "true";
    console.log(player.name);
    prepareToStart();
    // setTimeout(() => {
    //     title.classList.add("hide"); // закрытие меню

    //     gameSetting.play = true;
    //     requestAnimationFrame(playGame); // запуск функции playGame
    // }, 3000);
    title.classList.add("hide");
    gameSetting.play = true;
    player.speed = gameSetting.speed;
    requestAnimationFrame(playGame);
}

function playGame() {
    // console.log("play!");

    if (gameSetting.play) {
        document.addEventListener("keydown", startRun);
        document.addEventListener("keyup", stopRun);
        // moveElement(startBtn);
        player.movePlayer();
        moveRoad();
        moveElement();
        requestAnimationFrame(playGame);
    }
}
;
