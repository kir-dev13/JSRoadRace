startBtn.addEventListener("click", initGame);

function initGame() {
    playerYStart = (document.documentElement.clientHeight * 80) / 100;
    playerXStart = gameArea.offsetWidth * 0.5;
    windowHeight = document.documentElement.clientHeight;

    //* нажатие кнопки StartBtn
    startBtn.removeEventListener("click", initGame);
    startBtn.style.height = startBtn.offsetHeight + "px";
    startBtn.innerHTML = "";
    document.addEventListener("keydown", keyboardDownHandler);
    document.addEventListener("keyup", keyboardUpHandler);

    prepareToStart();

    startGame();
}

function startGame() {
    player.score = 0;
    engine.stop();
    timeToStart().then(() => {
        title.classList.add("hide");
        gameSetting.play = true;
        createEnemies(0);
        requestAnimationFrame(removeStartBtn);

        requestAnimationFrame(playGame);
    });
}

function stopGame() {
    gameSetting.play = false;
    // soundMove.stop();
    engine.stop();
    // player.speed = 0;
    document.removeEventListener("keydown", startBoost);
    document.removeEventListener("keyup", stopBoost);
    for (let key in keys) {
        keys[key] = false;
    }
}

function restartGame() {
    getDefaulSettingtValues();
    enemies.forEach((enemy) => {
        enemy.remove();
    });
    enemies.length = 0;
    player.car.remove();
    createPlayer();
    startGame();
}

function createEnemies(countEnemy) {
    for (let i = countEnemy; i < player.traffic; i++) {
        enemy.create(
            random(0, gameArea.offsetWidth - carWidth),
            3 * (i + 1) * -150
        );
    }
}
