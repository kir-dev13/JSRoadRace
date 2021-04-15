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
    player.speed = 0;

    gameSetting.play = false;

    console.log(
        "🚀 ~ file: _startGame.js ~ line 30 ~ startGame ~ player.speed",
        player.speed
    );

    timeToStart(); // запуск обратный отсчёт
    setTimeout(() => {
        // запуск playGame после таймера
        title.classList.add("hide"); // закрытие меню
        gameSetting.play = true;
        player.speed = gameSetting.speed;
        console.log(
            "🚀 ~ file: _startGame.js ~ line 41 ~ setTimeout ~ player.speed ",
            player.speed
        );

        //* Функция скрытия кнопки
        requestAnimationFrame(removeStartBtn);

        requestAnimationFrame(playGame);
    }, 0);
}
