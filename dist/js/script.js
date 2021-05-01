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

let enemies = [];

class Car {
    constructor(imgSrc, speed, ...classes) {
        this.imgSrc = imgSrc;
        this.speed = speed;
        this.classes = [...classes];
    }

    create(XChoord, YChoord) {
        this.car = document.createElement("img");
        gameArea.appendChild(this.car);
        this.classes.forEach((className) => this.car.classList.add(className));
        this.car.src = this.imgSrc;
        // this.xElem = XChoord;
        // this.yElem = YChoord;
        this.car.dataset.xElem = XChoord;
        this.car.dataset.yElem = YChoord;
        this.render();
        if (this.car.classList.contains("enemy")) {
            enemies.push(this.car);
        }
    }
    render() {
        this.car.style.left = this.car.dataset.xElem + "px";
        this.car.style.top = this.car.dataset.yElem + "px";
    }
}

let player = new Car("../img/player.png", 0, "car");

player.move = function (event) {
    if (keys.ArrowLeft && this.car.dataset.xElem > -3) {
        this.car.dataset.xElem = +this.car.dataset.xElem - this.speed / 2;
        this.car.style.transform = "rotate(-10deg)";
    }
    if (
        keys.ArrowRight &&
        this.car.dataset.xElem < gameArea.offsetWidth - this.car.offsetWidth + 1
    ) {
        this.car.dataset.xElem = +this.car.dataset.xElem + this.speed / 2;
        this.car.style.transform = "rotate(10deg)";
    }
    if (
        (!keys.ArrowRight && !keys.ArrowLeft) ||
        this.car.dataset.xElem <= -1 ||
        this.car.dataset.xElem >=
            gameArea.offsetWidth - this.car.offsetWidth + 1
    ) {
        this.car.style.transform = "rotate(0deg)";
    }

    this.render();
};

let enemy = new Car("../img/enemy1.png", 2, "enemy", "car");

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
<<<<<<< HEAD
    traffic: 3,
=======
    traffic: 8,
>>>>>>> 984cfe2e91c34747bf95ed8226c1882dfbe9459a
};

startBtn.addEventListener("click", initGame);

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
        roadMark.yElem = i * ((4 * windowHeight) / 20);
        roadMark.style.top = roadMark.yElem + "px";
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
    player.car.dataset.xElem =
        player.car.dataset.xElem - player.car.offsetWidth / 2;
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
<<<<<<< HEAD
    gameSetting.play = false;
    //! удалить всех врагов!

    carWidth = document.querySelector(".car").offsetWidth;
    carHeight = document.querySelector(".car").offsetHeight;

    player.speed = 0;
    player.traffic = gameSetting.traffic;

    timeToStart(); // запуск обратный отсчёт
    setTimeout(() => {
        // запуск playGame после таймера
        title.classList.add("hide"); // закрытие меню
        gameSetting.play = true;
        player.speed = gameSetting.speed;
        //* Функция скрытия кнопки
        requestAnimationFrame(removeStartBtn);
        // enemy.create();
        // if (gameSetting.enemies) {
        createEnemies(0);
        // }
        setInterval(() => {
            // let targets = document.querySelectorAll(".enemy");
            // targets.forEach((target) => {
            //     console.log("style.top:  " + target.style.top);
            // });
            // console.log(enemies);
            // console.log(document.querySelectorAll(".enemy"));
        }, 3000);
=======
  gameSetting.play = false;
  //! удалить всех врагов!

  carWidth = document.querySelector(".car").offsetWidth;
  carHeight = document.querySelector(".car").offsetHeight;

  player.speed = 0;
  player.traffic = gameSetting.traffic;

  timeToStart(); // запуск обратный отсчёт
  setTimeout(() => {
    // запуск playGame после таймера
    title.classList.add("hide"); // закрытие меню
    gameSetting.play = true;
    player.speed = gameSetting.speed;
    //* Функция скрытия кнопки
    requestAnimationFrame(removeStartBtn);
    // enemy.create();
    // if (gameSetting.enemies) {
    createEnemies();
    // }
    setInterval(() => {
      //   console.log(+player.car.dataset.yElem);
      // let targets = document.querySelectorAll(".enemy");
      // targets.forEach((target) => {
      //     console.log("style.top:  " + target.style.top);
      // });
      // console.log(enemy);
    }, 1000);
>>>>>>> 984cfe2e91c34747bf95ed8226c1882dfbe9459a

    requestAnimationFrame(playGame);
  }, 0);
}

<<<<<<< HEAD
function createEnemies(count) {
    for (let i = count; i < player.traffic; i++) {
        enemy.create(
            random(0, gameArea.offsetWidth - carWidth),
            3 * (i + 1) * -150
        );
    }
=======
function createEnemies() {
  for (let i = 0; i < player.traffic; i++) {
    // enemy.create(
    //     random(carWidth, gameArea.offsetWidth - carWidth),

    //     i * ((4 * windowHeight) / 20)
    // );
    enemy.create(
      random(0, gameArea.offsetWidth - carWidth),
      3 * (i + 1) * -150
    );
    // console.log("enemy.yElem: " + enemy.yElem);
    // console.log(
    //     "🚀 ~ file: _startGame.js ~ line 78 ~ createEnemies ~ enemy",
    //     enemy
    // );
    // document.querySelector(".enemy").dataset.yElem = enemy.yElem;
    // console.log(document.querySelector(".enemy"));
    // enemy.dataset.y = enemy.yElem;
    // enemy.setAttribute("data-yElem", enemy.yElem);
  }
>>>>>>> 984cfe2e91c34747bf95ed8226c1882dfbe9459a
}
;
let boostDelta = 0,
    boostStop = false;

function startBoost(event) {
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
function stopBoost(event) {
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
//         console.log(startBtn.y);
//         if (elem.y >= document.documentElement.clientHeight) {
//             elem.remove();
//             canceled = true;
//             console.log("объект " + elem + " покинул предел экрана");
//             return;
//         }
//     };
// }

function moveRoad() {
<<<<<<< HEAD
    // вызывается в playGame()
    let lines = document.querySelectorAll(".road-mark");
    lines.forEach(function (line) {
        line.yElem += player.speed;
        line.style.top = line.yElem + "px";
        if (line.yElem >= document.documentElement.clientHeight) {
            line.yElem = -((3 * windowHeight) / 20 + 35);
        }
    });
}

function moveEnemy(attemptCarAppend) {
    for (let n = 0; n < enemies.length; n++) {
        enemies[n].dataset.yElem =
            +enemies[n].dataset.yElem + player.speed - enemy.speed;

        enemies[n].style.top = enemies[n].dataset.yElem + "px";

        if (
            +enemies[n].dataset.yElem >= document.documentElement.clientHeight
        ) {
            //*удаляем машину если трафик стал меньше, проверяем и меняем координаты, чтобы машины не накладывались
            enemyRepeat(enemies, n, attemptCarAppend);
        }
=======
  // вызывается в playGame()
  let lines = document.querySelectorAll(".road-mark");
  lines.forEach(function (line) {
    line.yElem += player.speed;
    line.style.top = line.yElem + "px";
    if (line.yElem >= document.documentElement.clientHeight) {
      line.yElem = -((3 * windowHeight) / 20 + 35);
    }
  });
}
// let itemYChoord;
function moveEnemy() {
  // console.log("enemy: " + enemy);
  let enemies = document.querySelectorAll(".enemy");

  if (enemies.length < player.traffic) {
    enemy.create(
      random(carWidth, gameArea.offsetWidth - carWidth),
      3 * (player.traffic + 1) * -150
    );
    // ! запушить ещё одного enemy
    enemies = document.querySelectorAll(".enemy");
  }

  for (let n = 0; n < enemies.length; n++) {
    enemies[n].dataset.yElem =
      +enemies[n].dataset.yElem + player.speed - enemy.speed;

    enemies[n].style.top = enemies[n].dataset.yElem + "px";

    checkRoadAccident(createArrayEnemiesChoords(enemies));

    if (+enemies[n].dataset.yElem >= document.documentElement.clientHeight) {
      checkCarPossibility(enemies, n);
>>>>>>> 984cfe2e91c34747bf95ed8226c1882dfbe9459a
    }
  }
}

function playGame() {
<<<<<<< HEAD
    if (gameSetting.play) {
        document.addEventListener("keydown", startBoost);
        document.addEventListener("keyup", stopBoost);
        player.move();
        moveRoad();

        let attemptCarAppend = 0;
        //*увеличиваем машины, если их меньше траффика
        if (enemies.length < player.traffic) {
            createEnemies(enemies.length);
            console.log("добавили");
            checkCarPossibility(enemies, enemies.length - 1, attemptCarAppend);
        }

        moveEnemy(attemptCarAppend);
        requestAnimationFrame(playGame);
=======
  if (gameSetting.play) {
    document.addEventListener("keydown", startRun);
    document.addEventListener("keyup", stopRun);
    player.move();
    moveRoad();
    moveEnemy();

    requestAnimationFrame(playGame);
  }
}

function checkCarPossibility(enemies, n) {
  // let checkX = false;
  // let checkY = false;
  // createArrayEnemiesChoords(enemies);
  // console.log(carY);
  enemies[n].dataset.yElem = random(-400, 0) - 350;
  enemies[n].dataset.xElem = random(0, gameArea.offsetWidth - carWidth);

  let checkX = createArrayEnemiesChoords(enemies).x.some((item) => {
    return (
      enemies[n].dataset.xElem > item - carWidth - 10 &&
      enemies[n].dataset.xElem < item + carWidth + 10
    );
  });

  let checkY = createArrayEnemiesChoords(enemies).y.some((item) => {
    return (
      enemies[n].dataset.yElem > item - carHeight - 15 &&
      enemies[n].dataset.yElem < item + carHeight + 15
    );
  });

  if (checkX && checkY) {
    console.log("поменяли");
    checkCarPossibility(enemies, n);
  } else {
    console.log("не поменяли");

    enemies[n].style.top = enemies[n].dataset.yElem + "px";
    enemies[n].style.left = enemies[n].dataset.xElem + "px";
    return;
  }
}

function createArrayEnemiesChoords(array) {
  let arrEnemiesChoords = {
    x: [],
    y: [],
  };

  array.forEach((item) => {
    if (+item.dataset.yElem < document.documentElement.clientHeight) {
      arrEnemiesChoords.x.push(
        item.getBoundingClientRect().x - leftSide.offsetWidth
      );
      arrEnemiesChoords.y.push(item.getBoundingClientRect().y);
    }
  });
  // console.log(arrEnemiesChoords);
  return arrEnemiesChoords;
}

function checkRoadAccident(object) {
  object.y.some((item) => {
    if (
      +player.car.dataset.yElem <= item + carHeight &&
      +player.car.dataset.yElem + carHeight >= item &&

      
    ) {
      console.log("абырвалг");
>>>>>>> 984cfe2e91c34747bf95ed8226c1882dfbe9459a
    }
  });
}

function checkCarPossibility(enemies, n, attemptCarAppend) {
    enemies[n].dataset.yElem = random(-400, 0) - 350;
    enemies[n].dataset.xElem = random(0, gameArea.offsetWidth - carWidth);

    let checkX = getArrayEnemiesChoords(enemies).x.some((item) => {
        return (
            enemies[n].dataset.xElem > item - carWidth - 10 &&
            enemies[n].dataset.xElem < item + carWidth + 10
        );
    });

    let checkY = getArrayEnemiesChoords(enemies).y.some((item) => {
        return (
            enemies[n].dataset.yElem > item - carHeight - 15 &&
            enemies[n].dataset.yElem < item + carHeight + 15
        );
    });

    if (checkX && checkY) {
        console.log("поменяли");
        attemptCarAppend = attemptCarAppend + 1;

        if (attemptCarAppend === 5) {
            console.log("УДАЛИЛИ");
            enemies[n].remove();
            enemies.splice(n, 1);
            return;
        }
        checkCarPossibility(enemies, n, attemptCarAppend);
    } else {
        console.log("не поменяли");

        enemies[n].style.top = enemies[n].dataset.yElem + "px";
        enemies[n].style.left = enemies[n].dataset.xElem + "px";
        // enemy.enemies[n].render();
        return;
    }
}

function getArrayEnemiesChoords(array) {
    let arrEnemiesChoords = {
        x: [],
        y: [],
    };

    array.forEach((item) => {
        if (+item.dataset.yElem < document.documentElement.clientHeight) {
            arrEnemiesChoords.x.push(
                item.getBoundingClientRect().x - leftSide.offsetWidth
            );
            arrEnemiesChoords.y.push(item.getBoundingClientRect().y);
        }
    });
    // console.log(arrEnemiesChoords);
    return arrEnemiesChoords;
}

function enemyRepeat(enemies, n, attemptCarAppend) {
    if (enemies.length > player.traffic) {
        console.log("УДАЛИЛИ");
        enemies[n].remove();
        enemies.splice(n, 1);
        return;
    }
    checkCarPossibility(enemies, n, attemptCarAppend);
}
;
