//вспомогательные переменные
let carWidth;
let carHeight;
const playerYStart = (document.documentElement.clientHeight * 80) / 100,
    playerXStart = gameArea.offsetWidth * 0.5;

const gameSetting = {
    play: false,
    score: 0,
    speed: 4,
    boost: 2,
    enemies: true,
    traffic: 3,
    sound: true,
};

const enemies = [];

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

const player = new Car("img/player.png", 0, "car");

player.score = 0;

player.move = function () {
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


