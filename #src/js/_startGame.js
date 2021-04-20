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
        createEnemies();
        requestAnimationFrame(playGame);
    }, 0);
}

function moveEnemy() {
    // console.log(document.documentElement.clientHeight);
    let enemies = document.querySelectorAll(".enemy");

    enemies.forEach((item, n) => {
        let itemXChoord;
        let itemYChoord = item.y;
        itemYChoord += player.speed - enemy.speed;
        item.style.top = itemYChoord + "px";

        if (itemYChoord >= document.documentElement.clientHeight) {
            itemYChoord = random(-400, 0) - 350;
            item.style.top = itemYChoord + "px";

            itemXChoord = random(carWidth, gameArea.offsetWidth - carWidth);

            item.style.left = itemXChoord + "px";
        }
    });
}

function createEnemies() {
    carWidth = document.querySelector(".car").offsetWidth;
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
