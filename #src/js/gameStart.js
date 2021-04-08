const startBtn = document.querySelector(".game-area__button");
startBtn.y = 20;
const gameArea = document.querySelector(".game-area");
// Элементы страницы

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
};

const player = {
    movePlayer() {
        if (keys.ArrowLeft && this.x > 0) {
            this.x -= gameSetting.speed / 2;
            car.style.transform = "rotate(-10deg)";
        }
        if (
            keys.ArrowRight &&
            this.x < gameArea.offsetWidth - car.offsetWidth
        ) {
            this.x += gameSetting.speed / 2;
            car.style.transform = "rotate(10deg)";
        }
        if (!keys.ArrowRight && !keys.ArrowLeft) {
            car.style.transform = "rotate(0deg)";
        }
        this.render();
    },
    render() {
        car.style.left = this.x + "px";
    },
};

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);

function moveElement() {
    startBtn.y += gameSetting.speed;
    startBtn.style.top = startBtn.y + "px";
    console.log(startBtn.y);
    if (startBtn.y >= document.documentElement.clientHeight) {
        startBtn.remove();
    }
}

function createRoadMarks() {
    let windowHeight = document.documentElement.clientHeight;
    // console.log(windowHeight);
    for (let i = 0; i < 10; i++) {
        const roadMark = document.createElement("div");
        roadMark.classList.add("road-mark");
        roadMark.style.height = windowHeight / 10 + "px";
        roadMark.y = i * 150;
        roadMark.style.top = i * 150 + "px";
        gameArea.appendChild(roadMark);
        // console.log(roadMark);
    }
}

function startRun(event) {
    event.preventDefault();
    // console.log("start");
    keys[event.key] = true;
}
function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
    // console.log("stop");
}

function moveRoad() {
    let lines = document.querySelectorAll(".road-mark");
    // console.log(lines);
    lines.forEach(function (line) {
        line.y += gameSetting.speed;
        line.style.top = line.y + "px";
        // console.log(line.y);
        if (line.y >= document.documentElement.clientHeight) {
            line.y = 0;
        }
    });
}

function startGame() {
    let heightStartBtn = startBtn.offsetHeight;
    // console.log(heightStartBtn);
    startBtn.innerHTML = "";
    startBtn.style.height = heightStartBtn + "px";
    document.querySelector(".game__title").classList.add("hide"); // закрытие меню

    createRoadMarks(); // создание полосок

    gameArea.appendChild(car);
    car.classList.add("car");
    car.style.left = car.offsetLeft - car.offsetWidth / 2 + "px"; // создание машины

    gameSetting.play = true; // изменение статуса gameSetting
    player.x = car.offsetLeft;
    player.render();

    requestAnimationFrame(playGame); // запуск функции playGame
}

function playGame() {
    // console.log("play!");

    if (gameSetting.play) {
        // moveElement(startBtn);
        player.movePlayer();
        moveRoad();
        moveElement();
        requestAnimationFrame(playGame);
    }
}
