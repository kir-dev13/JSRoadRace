function removeStartBtn() {
    if (startBtn.y >= document.documentElement.clientHeight || !startBtn) {
        startBtn.remove();
        return;
    }
    startBtn.y += player.speed;
    startBtn.style.top = startBtn.y + "px";
    requestAnimationFrame(removeStartBtn);
}

function stopGame() {
    gameSetting.play = false;
    // player.speed = 0;
}

function initGame() {
    //* нажатие кнопки StartBtn
    startBtn.style.height = startBtn.offsetHeight + "px";
    startBtn.innerHTML = "";
    prepareToStart();
    startGame();
}

function restartGame() {
    enemies.forEach((enemy) => {
        enemy.remove();
    });
    enemies = [];
    player.car.remove();
    createPlayer();
    console.log(player.car);
    console.log(player);
    startGame();
}

function startGame() {
    timeToStart(); // запуск обратный отсчёт
    setTimeout(() => {
        // запуск playGame после таймера
        title.classList.add("hide"); // закрытие меню
        gameSetting.play = true;
        createEnemies(0);
        requestAnimationFrame(removeStartBtn);
        requestAnimationFrame(playGame);
    }, 3000);
}

function createEnemies(countEnemy) {
    for (let i = countEnemy; i < player.traffic; i++) {
        enemy.create(
            random(0, gameArea.offsetWidth - carWidth),
            3 * (i + 1) * -150
        );
    }
}
