startBtn.addEventListener("click", initGame);

function initGame() {
    //* нажатие кнопки StartBtn
    startBtn.style.height = startBtn.offsetHeight + "px";
    startBtn.innerHTML = "";
    rightSide.appendChild(scoreDiv);
    prepareToStart();

    startGame();
}

function startGame() {
    player.score = 0;
    // soundStart.fade(0, 1, 1000);
    // soundStart.play();
    engine.stop();
    timeToStart(); // запуск обратный отсчёт

    setTimeout(() => {
        // запуск playGame после таймера
        title.classList.add("hide");
        gameSetting.play = true;
        createEnemies(0);
        requestAnimationFrame(removeStartBtn);
        // engine.fade(Howler._volume, 0, 3000, engine.play("start"));

        requestAnimationFrame(playGame);
    }, 3000);
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
    enemies.forEach((enemy) => {
        enemy.remove();
    });
    enemies = [];
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
