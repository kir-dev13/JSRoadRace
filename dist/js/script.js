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
            // elem.setAttribute("disabled", "disabled");
            elem.disabled = true;
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

//вспомогательные переменные

// const car = document.createElement("div");

class Car {
    constructor(imgSrc, speed, ...classes) {
        this.imgSrc = imgSrc;
        this.speed = speed;
        this.classes = [...classes];
    }
    create() {
        this.car = document.createElement("div");
        gameArea.appendChild(this.car);
        this.classes.forEach((className) => this.car.classList.add(className));
        this.car.style.backgroundImage = this.imgSrc;
        this.x = this.car.offsetLeft;
        this.y = this.car.offsetTop;
        console.log(
            "🚀 ~ file: _declarations.js ~ line 30 ~ Car ~ create ~ this.car.offsetHeight",
            this.car.offsetHeight
        );
        this.render();
    }
    render() {
        this.car.style.left = this.x + "px";
        this.car.style.top = this.y + "px";
    }
}

let player = new Car(`url('../img/player.png')`, 0, "car");
player.move = function (event) {
    if (keys.ArrowLeft && this.x > 0) {
        this.x -= this.speed / 2;
        this.car.style.transform = "rotate(-10deg)";
    }
    if (
        keys.ArrowRight &&
        this.x < gameArea.offsetWidth - this.car.offsetWidth
    ) {
        this.x += this.speed / 2;
        this.car.style.transform = "rotate(10deg)";
    }
    if (!keys.ArrowRight && !keys.ArrowLeft) {
        this.car.style.transform = "rotate(0deg)";
    }
    this.render();
};

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

startBtn.addEventListener("click", initGame);

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
;
;
function getMenuValues() {
    //* Получение элементов со страницы

    //*имя игрока
    if (!userName.value) {
        userName.value = "player";
    }
    player.name = userName.value.capitalize();
    userName.disabled = "true";
    //TODO сложность, музыка
}

function createRoadMarks() {
    // в prepareToStart()
    for (let i = 0; i < 6; i++) {
        const roadMark = document.createElement("div");
        roadMark.classList.add("road-mark");
        roadMark.style.height = windowHeight / 15 + "px";
        roadMark.y = i * ((4 * windowHeight) / 20);
        roadMark.style.top = roadMark.y + "px";
        if (i === 0) {
            roadMark.style.backgroundColor = "green";
        }

        gameArea.appendChild(roadMark);
        // console.log(roadMark);
    }
}

function timeToStart() {
    //startGame()

    //*Скрытие меню
    titleWords.forEach((word) => (word.innerText = ""));
    //*Обратный отсчёт до старта
    title.style.fontSize = "6rem";
    title.classList.remove("hide");
    titleWord.innerHTML = "3";
    setTimeout(() => {
        titleWord.innerHTML = "2";
    }, 1000);
    setTimeout(() => {
        titleWord.innerHTML = "1";
    }, 2000);
}

function prepareToStart() {
    getMenuValues();

    //* трансформация кнопки старт
    startBtn.style.height = startBtn.offsetHeight + "px";
    startBtn.innerHTML = "";

    createRoadMarks(); //* создание и вставка полосок

    //* создание машины и вставка машины

    player.create();

    // timeToStart(); //обратный отсчёт
}
;
function removeStartBtn() {
    //задействована в startGame()
    if (startBtn.y >= document.documentElement.clientHeight) {
        startBtn.remove();
        return;
    }
    startBtn.y += player.speed;
    startBtn.style.top = startBtn.y + "px";

    // console.log(startBtn.y);

    requestAnimationFrame(removeStartBtn);
}

function stopGame() {
    gameSetting.play = false;
    player.speed = 0;
}

function initGame() {
    //* нажатие кнопки StartBtn
    prepareToStart();
    startGame();
}

function startGame() {
    player.speed = 0;

    gameSetting.play = false;

    console.log(
        "🚀 ~ file: _startGame.js ~ line 30 ~ startGame ~ player.speed",
        player.speed
    );

    timeToStart(); // запуск обратный отсчёт
    setTimeout(() => {
        // запуск playGame после таймера
        title.classList.add("hide"); // закрытие меню
        gameSetting.play = true;
        player.speed = gameSetting.speed;
        console.log(
            "🚀 ~ file: _startGame.js ~ line 41 ~ setTimeout ~ player.speed ",
            player.speed
        );

        //* Функция скрытия кнопки
        requestAnimationFrame(removeStartBtn);

        requestAnimationFrame(playGame);
    }, 0);
}
;
let boostDelta = 0,
    boostStop = false;

function startRun(event) {
    event.preventDefault();

    // console.log("start");
    keys[event.key] = true;
    switch (event.keyCode) {
        case 38:
            if (event.repeat) {
                break;
            }
            boostStop = false;
            // player.speed += gameSetting.boost;
            // (function () {
            //     let boostDelta = 0;
            //     let boostingInterval = setInterval(function () {
            //         boostDelta += 0.5;
            //         player.speed += 0.5;
            //         if (boostDelta >= gameSetting.boost) {
            //             console.log("предел скорости");

            //             clearInterval(boostingInterval);
            //         }
            //     }, 500);
            // })();
            requestAnimationFrame(function boosting() {
                boostDelta += 0.01;
                player.speed += 0.01;

                if (boostDelta >= gameSetting.boost || boostStop == true) {
                    console.log("предел скорости");
                    return;
                }
                requestAnimationFrame(boosting);
            });
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
            boostStop = true;
            // player.speed -= gameSetting.boost;
            requestAnimationFrame(function unBoosting() {
                boostDelta -= 0.02;
                player.speed -= 0.02;

                if (boostDelta <= 0) {
                    player.speed = Math.round(player.speed);
                    console.log("вернулись");
                    return;
                }
                requestAnimationFrame(unBoosting);
            });
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
;
// //! не задействованная функция !
// function moveElement(elem) {
//     let canceled = false;
//     return function (elem) {
//         if (canceled) {
//             return;
//         }
//         elem.y += player.speed;
//         elem.style.top = elem.y + "px";
//         // console.log(startBtn.y);
//         if (elem.y >= document.documentElement.clientHeight) {
//             elem.remove();
//             canceled = true;
//             console.log("объект " + elem + " покинул предел экрана");
//             return;
//         }
//     };
// }

function moveRoad() {
    // задействована в playGame()
    let lines = document.querySelectorAll(".road-mark");
    // console.log(lines);
    lines.forEach(function (line) {
        line.y += player.speed;
        line.style.top = line.y + "px";
        // console.log(player.speed);
        // console.log(line.y);
        if (line.y >= document.documentElement.clientHeight) {
            // line.y = -((3 * windowHeight) / 20);
            line.y = -((3 * windowHeight) / 20 + 35);
        }
    });
}

function playGame() {
    if (gameSetting.play) {
        document.addEventListener("keydown", startRun);
        document.addEventListener("keyup", stopRun);
        // moveElement(startBtn);
        player.move();
        moveRoad();

        // moveElement();
        // moveElement(startBtn); // убирание кнопки

        requestAnimationFrame(playGame);
    }
}
;
