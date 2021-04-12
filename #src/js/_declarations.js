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
