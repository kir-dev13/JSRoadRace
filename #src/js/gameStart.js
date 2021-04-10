startBtn.addEventListener("click", initGame);

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

    if (!userName.value) {
        userName.value = "player";
    }
    player.name = userName.value.capitalize();
    userName.disabled = "true";

    gameArea.appendChild(car);
    car.classList.add("car");
    car.style.left = car.offsetLeft - car.offsetWidth / 2 + "px"; // создание машины

    player.x = car.offsetLeft;
    player.render();
    title.style.fontSize = "6rem";
    timeToStart();
}

function timeToStart() {
    title.classList.remove("hide");
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
    }
}

function moveRoad() {
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
    player.speed = 0;
    gameSetting.play = false;
    timeToStart();
    setTimeout(() => {
        title.classList.add("hide"); // закрытие меню
        gameSetting.play = true;
        player.speed = gameSetting.speed;
        console.log(gameSetting.play);
        requestAnimationFrame(playGame);
    }, 3000);
}

function initGame() {
    prepareToStart();
    startGame();

    // title.classList.add("hide");
    // gameSetting.play = true;
    // player.speed = gameSetting.speed;
    // requestAnimationFrame(playGame);
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
