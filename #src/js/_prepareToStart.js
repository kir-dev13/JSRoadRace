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
