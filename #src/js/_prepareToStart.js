function getMenuValues() {
    //* Получение элементов со страницы
    //*имя игрока
    if (!userName.value) {
        userName.value = "Игрок";
    }
    player.name = userName.value.capitalize();
    userName.disabled = "true";
    //TODO сложность
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
    }
}

function timeToStart() {
    //*Обратный отсчёт до старта
    // звук зажигания
    soundPlay(engine.fade(0, Howler.volume() + 0.2, 100, engine.play("start")));
    delay(2500).then(() => {
        engine.fade(0, Howler.volume(), 500, engine.play("move"));
    });

    // включаем обратный отсчёт
    titleWords.forEach((word) => (word.innerText = ""));
    title.style.fontSize = "6rem";
    title.classList.remove("hide");
    titleWord.innerHTML = "3";
    console.log("sound 3");

    return delay(1000)
        .then(() => {
            return (titleWord.innerHTML = "2"), console.log(`sound 2`);
        })
        .then(() => {
            return delay(1000);
        })
        .then(() => {
            return (titleWord.innerHTML = "1"), console.log(`sound 1`);
        })
        .then(() => {
            return delay(1000);
        });
}

function prepareToStart() {
    getMenuValues();
    createRoadMarks();
    createPlayer();

    rightSide.appendChild(scoreDiv);

    player.speed = gameSetting.speed;
    player.traffic = gameSetting.traffic;
}

function createPlayer() {
    player.create(playerXStart, playerYStart);
    player.car.dataset.xElem =
        player.car.dataset.xElem - player.car.offsetWidth / 2;
    player.render();
    carWidth = document.querySelector(".car").offsetWidth;
    carHeight = document.querySelector(".car").offsetHeight;
}
