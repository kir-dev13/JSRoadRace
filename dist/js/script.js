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
const leftSide = document.querySelector(".left-side");
let title = document.querySelector(".game__title");
let titleWord = title.querySelector(".title__word");
let titleWords = title.querySelectorAll(".title__word");
const userName = document.querySelector(".input__user-name");
// Элементы страницы

let windowHeight = document.documentElement.clientHeight;

//вспомогательные переменные
let carWidth;
let carHeight;

//*НАЧАЛЬНЫЕ КООРДИНАТЫ ИГРОКА:
const playerYStart = (document.documentElement.clientHeight * 80) / 100,
    playerXStart = gameArea.offsetWidth * 0.5;

// const car = document.createElement("div");

class Car {
    constructor(imgSrc, speed, ...classes) {
        this.imgSrc = imgSrc;
        this.speed = speed;
        // this.x = x;
        // this.y = y;
        this.classes = [...classes];
    }
    // create() {

    // }
    create(XChoord, YChoord) {
        this.car = document.createElement("img");
        gameArea.appendChild(this.car);
        this.classes.forEach((className) => this.car.classList.add(className));
        this.car.src = this.imgSrc;
        this.x = XChoord - this.car.offsetWidth / 2;
        // this.x = XChoord;
        this.y = YChoord;

        this.render();
    }
    render() {
        this.car.style.left = this.x + "px";
        this.car.style.top = this.y + "px";
    }
}

let player = new Car("../img/player.png", 0, "car");

player.move = function (event) {
    if (keys.ArrowLeft && this.x > -3) {
        this.x -= this.speed / 2;
        this.car.style.transform = "rotate(-10deg)";
    }
    if (
        keys.ArrowRight &&
        this.x < gameArea.offsetWidth - this.car.offsetWidth + 1
    ) {
        this.x += this.speed / 2;
        this.car.style.transform = "rotate(10deg)";
    }
    if (
        (!keys.ArrowRight && !keys.ArrowLeft) ||
        this.x <= -1 ||
        this.x >= gameArea.offsetWidth - this.car.offsetWidth + 3
    ) {
        this.car.style.transform = "rotate(0deg)";
    }

    this.render();
};

let enemy = new Car("../img/enemy1.png", 2, "enemy", "car");

// enemy.move = function () {
//     // console.log(this.y);
//     // console.log(this.speed);
//     // console.log(this.y);
//     this.y += player.speed - this.speed;
//     this.render();
// };

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};

const gameSetting = {
    play: false,
    score: 0,
    speed: 4,
    boost: 2,
    enemies: true,
    traffic: 8,
};

startBtn.addEventListener("click", initGame);

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
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

    player.create(playerXStart, playerYStart);

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
    gameSetting.play = false;
    //! удалить всех врагов!
    player.speed = 0;
    timeToStart(); // запуск обратный отсчёт
    setTimeout(() => {
        // запуск playGame после таймера
        title.classList.add("hide"); // закрытие меню
        gameSetting.play = true;
        player.speed = gameSetting.speed;
        //* Функция скрытия кнопки
        requestAnimationFrame(removeStartBtn);
        // enemy.create();
        if (gameSetting.enemies) {
            createEnemies();
        }
        requestAnimationFrame(playGame);
    }, 0);
}

function createEnemies() {
    carWidth = document.querySelector(".car").offsetWidth;
    carHeight = document.querySelector(".car").offsetHeight;
    for (let i = 0; i < gameSetting.traffic; i++) {
        enemy.create(
            random(carWidth, gameArea.offsetWidth - carWidth),
            3 * (i + 1) * -150
        );
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
;
let boostDelta = 0,
    boostStop = false;

function startRun(event) {
    event.preventDefault();

    keys[event.key] = true;
    switch (event.keyCode) {
        case 38:
            if (event.repeat) {
                break;
            }
            boostStop = false;
            requestAnimationFrame(function boosting() {
                boostDelta += 0.01;
                player.speed += 0.01;

                if (boostDelta >= gameSetting.boost || boostStop == true) {
                    return;
                }
                requestAnimationFrame(boosting);
            });
            break;
        case 40:
            if (event.repeat) {
                break;
            }
            boostStop = false;
            // player.speed -= gameSetting.boost - 1;
            // break;
            requestAnimationFrame(function boosting() {
                boostDelta -= 0.01;
                player.speed -= 0.01;

                if (
                    boostDelta <= gameSetting.boost * -1 + 1 ||
                    boostStop == true
                ) {
                    return;
                }
                requestAnimationFrame(boosting);
            });
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
            requestAnimationFrame(function unBoosting() {
                boostDelta -= 0.01;
                player.speed -= 0.01;

                if (boostDelta <= 0) {
                    player.speed = Math.round(player.speed);

                    return;
                }
                requestAnimationFrame(unBoosting);
            });
            break;

        case 40:
            if (event.repeat) {
                break;
            }
            // player.speed += gameSetting.boost - 1;
            boostStop = true;
            // player.speed -= gameSetting.boost;
            requestAnimationFrame(function unBoosting() {
                boostDelta += 0.01;
                player.speed += 0.01;

                if (boostDelta >= 0) {
                    player.speed = Math.round(player.speed);

                    return;
                }
                requestAnimationFrame(unBoosting);
            });
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

function moveEnemy() {
    // console.log(document.documentElement.clientHeight);
    let enemies = document.querySelectorAll(".enemy");
    if (enemies.length < gameSetting.traffic) {
        enemy.create(
            random(carWidth, gameArea.offsetWidth - carWidth),
            3 * (gameSetting.traffic + 1) * -150
        );
    }
    for (let n = 0; n < enemies.length; n++) {
        let itemXChoord;
        let itemYChoord = enemies[n].y;
        itemYChoord += player.speed - enemy.speed;
        enemies[n].style.top = itemYChoord + "px";
        if (itemYChoord >= document.documentElement.clientHeight) {
            // console.log("Машина ушла " + enemies[n].style.left);

            let arrEnemiesChoords = {
                x: [],
                y: [],
            };

            itemYChoord = random(-400, 0) - 350;
            itemXChoord = random(carWidth, gameArea.offsetWidth - carWidth);

            enemies.forEach((enemy) => {
                if (enemy.y < document.documentElement.clientHeight) {
                    arrEnemiesChoords.x.push(
                        enemy.getBoundingClientRect().x - leftSide.offsetWidth
                    );
                    arrEnemiesChoords.y.push(enemy.getBoundingClientRect().y);
                    // console.log(enemies[n].style.left, arrEnemiesChoords.x);
                }
            });

            checkCarPossibility();

            function checkCarPossibility() {
                itemYChoord = random(-400, 0) - 350;
                itemXChoord = random(carWidth, gameArea.offsetWidth - carWidth);

                let checkX = arrEnemiesChoords.x.some((item) => {
                    return (
                        itemXChoord > item - carWidth - 10 &&
                        itemXChoord < item + carWidth + 10
                    );
                });

                let checkY = arrEnemiesChoords.y.some((item) => {
                    return (
                        itemYChoord > item - carHeight - 10 &&
                        itemYChoord < item + carHeight + 10
                    );
                });

                console.log(checkX, checkY);

                if (checkX && checkY) {
                    console.log("поменяли");

                    checkCarPossibility();
                } else {
                    enemies[n].style.top = itemYChoord + "px";
                    enemies[n].style.left = itemXChoord + "px";
                    return;
                }
            }
        }
    }
}

function playGame() {
    if (gameSetting.play) {
        document.addEventListener("keydown", startRun);
        document.addEventListener("keyup", stopRun);

        // moveElement(startBtn);
        player.move();
        moveRoad();
        moveEnemy();
        // enemy.move();
        // moveElement();
        // moveElement(startBtn); // убирание кнопки

        requestAnimationFrame(playGame);
    }
}
;
