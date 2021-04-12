startBtn.addEventListener("click", initGame);

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function removeStartBtn() {
    //задействована startGame()
    if (startBtn.y >= document.documentElement.clientHeight) {
        startBtn.remove();
        console.log("StartBtn ушла...");
        return;
    }
    startBtn.y += player.speed;
    startBtn.style.top = startBtn.y + "px";

    // console.log(startBtn.y);

    requestAnimationFrame(removeStartBtn);
}

//! не задействованная функция !
function moveElement(elem) {
    let canceled = false;
    return function (elem) {
        if (canceled) {
            return;
        }
        elem.y += player.speed;
        elem.style.top = elem.y + "px";
        // console.log(startBtn.y);
        if (elem.y >= document.documentElement.clientHeight) {
            elem.remove();
            canceled = true;
            console.log("объект " + elem + " покинул предел экрана");
            return;
        }
    };
}

function prepareToStart() {
    //* Получение элементов со страницы

    //*имя игрока
    if (!userName.value) {
        userName.value = "player";
    }
    player.name = userName.value.capitalize();
    userName.disabled = "true";
    //TODO сложность, музыка

    //* трансформация кнопки старт
    startBtn.style.height = startBtn.offsetHeight + "px";
    startBtn.innerHTML = "";

    //*Скрытие меню
    titleWords.forEach((word) => (word.innerText = ""));

    createRoadMarks(); //* создание и вставка полосок

    //* создание машины и вставка машины
    gameArea.appendChild(car);
    car.classList.add("car");
    car.style.left = car.offsetLeft - car.offsetWidth / 2 + "px";
    player.x = car.offsetLeft; //присваивание координат в объект

    player.render(); //рендер

    timeToStart(); //обратный отсчёт
}

function timeToStart() {
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

function createRoadMarks() {
    // console.log(windowHeight);
    for (let i = 0; i < 6; i++) {
        const roadMark = document.createElement("div");
        roadMark.classList.add("road-mark");
        roadMark.style.height = windowHeight / 15 + "px";
        roadMark.y = i * ((4 * windowHeight) / 20);
        roadMark.style.top = roadMark.y + "px";
        // if (i === 0) {
        //     roadMark.style.backgroundColor = "green";
        // }

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

function initGame() {
    prepareToStart();
    startGame();

    // title.classList.add("hide");
    // gameSetting.play = true;
    // player.speed = gameSetting.speed;
    // requestAnimationFrame(playGame);
}
