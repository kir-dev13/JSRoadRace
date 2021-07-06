const gameSetting = {
    play: false,
    score: 0,
    speed: 4,
    boost: 2,
    enemies: true,
    traffic: 3,
    sound: true,
};

function getBooleanDataFromSessionStorage(item) {
    if (
        sessionStorage.getItem(item) &&
        sessionStorage.getItem(item) === "false"
    ) {
        return false;
    } else if (sessionStorage.getItem(item)) {
        return sessionStorage.getItem(item);
    } else {
        return false;
    }
}

const checkboxMusic = document.querySelector("#checkbox-music");
checkboxMusic.checked = getBooleanDataFromSessionStorage("checkboxMusic");

const checkboxSound = document.querySelector("#checkbox-sound");
checkboxSound.checked = !getBooleanDataFromSessionStorage("checkboxSound");

const soundControlBar = document.querySelector(".sound__volume");
let volumeValue = undefined;
console.log(
    "🚀 ~ file: _declarations.js ~ line 32 ~ sessionStorage.getItem(volume)",
    sessionStorage.getItem("volume")
);
if (sessionStorage.getItem("volume")) {
    volumeValue = sessionStorage.getItem("volume") * 100;
}
volumeValue === 0 ? (volumeValue += 0.01) : volumeValue * 1;
console.log("🚀 ~ file: _declarations.js ~ line 33 ~ volumeValue", volumeValue);
soundControlBar.value = volumeValue || 50;

Howler.volume((soundControlBar.value * 0.01).toFixed(2));
console.log(Howler._volume);

let engine = new Howl({
    src: ["audio/engine.mp3"],
    onend: function () {},
    sprite: {
        start: [100, 3000],
        startMove: [10000, 3000],
        slow: [33300, 2000, true],
        move: [40700, 3500, true],
        boost: [48000, 4000, true],
        fast: [51000, 3000, true],
    },
    volume: Howler.volume(),
});

let crush = new Howl({
    src: ["audio/crush1.mp3"],
    volume: Howler.volume(),
});

const startBtn = document.querySelector(".game-area__button");
startBtn.y = 20;
const gameArea = document.querySelector(".game-area");
const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");
let title = document.querySelector(".game__title");
let titleWord = title.querySelector(".title__word");
let titleWords = title.querySelectorAll(".title__word");
const userName = document.querySelector(".input__user-name");
let scoreDiv = document.createElement("div");
scoreDiv.classList.add("score");

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

let player = new Car("img/player.png", 0, "car");

player.score = 0;

player.move = function (event) {
    if (keys.ArrowLeft && this.car.dataset.xElem > -3) {
        this.car.dataset.xElem = +this.car.dataset.xElem - this.speed / 2;
        this.car.style.transform = "rotate(-2deg)";
    }
    if (
        keys.ArrowRight &&
        this.car.dataset.xElem < gameArea.offsetWidth - this.car.offsetWidth + 1
    ) {
        this.car.dataset.xElem = +this.car.dataset.xElem + this.speed / 2;
        this.car.style.transform = "rotate(2deg)";
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

let enemy = new Car("img/enemy1.png", 2, "enemy", "car");

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
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
