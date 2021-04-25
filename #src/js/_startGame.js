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

    carWidth = document.querySelector(".car").offsetWidth;
    carHeight = document.querySelector(".car").offsetHeight;

    player.speed = 0;
    player.traffic = gameSetting.traffic;

    timeToStart(); // запуск обратный отсчёт
    setTimeout(() => {
        // запуск playGame после таймера
        title.classList.add("hide"); // закрытие меню
        gameSetting.play = true;
        player.speed = gameSetting.speed;
        //* Функция скрытия кнопки
        requestAnimationFrame(removeStartBtn);
        // enemy.create();
        // if (gameSetting.enemies) {
        createEnemies();
        // }
        setInterval(() => {
            let targets = document.querySelectorAll(".enemy");
            targets.forEach((target) => {
                console.log(target.style.top);
            });
            console.log(itemYChoord);
        }, 1000);

        requestAnimationFrame(playGame);
    }, 0);
}

function createEnemies() {
    for (let i = 0; i < player.traffic; i++) {
        enemy.create(
            random(carWidth, gameArea.offsetWidth - carWidth),
            3 * (i + 1) * -150
        );
        console.log(enemy.y);
    }
}
