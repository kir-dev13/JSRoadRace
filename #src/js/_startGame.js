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
    gameSetting.play = false;
    //! удалить всех врагов!
    player.speed = 0;
    timeToStart(); // запуск обратный отсчёт
    setTimeout(() => {
        // запуск playGame после таймера
        title.classList.add("hide"); // закрытие меню
        gameSetting.play = true;
        player.speed = gameSetting.speed;
        //* Функция скрытия кнопки
        requestAnimationFrame(removeStartBtn);
        // enemy.create();
        if (gameSetting.enemies) {
            createEnemies();
        }
        requestAnimationFrame(playGame);
    }, 0);
}

function createEnemies() {
    carWidth = document.querySelector(".car").offsetWidth;
    carHeight = document.querySelector(".car").offsetHeight;
    for (let i = 0; i < gameSetting.traffic; i++) {
        enemy.create(
            random(carWidth, gameArea.offsetWidth - carWidth),
            3 * (i + 1) * -150
        );
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
