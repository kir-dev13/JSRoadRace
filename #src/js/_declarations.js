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
        this.render();
    }
    render() {
        this.car.style.left = this.x + "px";
        this.car.style.top = this.y + "px";
    }
}

let player = new Car(`url('../img/player.png')`, 0, "car");
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

let enemy = new Car(`url('../img/enemy1.png')`, 2, "enemy", "car");
enemy.move = function () {
    // console.log(this.y);
    // console.log(this.speed);
    // console.log(this.y);
    this.y += player.speed - this.speed;
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
    speed: 4,
    boost: 2,
};

startBtn.addEventListener("click", initGame);

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
