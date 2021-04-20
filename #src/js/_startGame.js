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
    // player.x = gameArea.offsetWidth / 2 - player.car.offsetWidth / 2; центрирование машины
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

// function createEnemies() {
//     for (let i = 0; i <= gameSetting.traffic; i++) {
//         let enemy = document.createElement("img");
//         enemy.classList.add("car", "enemy");
//         enemy.src = "../img/enemy1.png";
//         // enemies[i].create();
//         let enemyYChoords = (i * 5 + 1) * -100;
//         enemy.style.top = enemyYChoords + "px";
//         gameArea.appendChild(enemy);
//     }
// }
// function createEnemies() {
//     let enemies = [];
//     for (let i = 0; i <= gameSetting.traffic; i++) {
//         enemies[i] = new Car("../img/enemy1.png", 2, "enemy", "car");
//         // enemy[i] = document.createElement("img");
//         // enemy[i].src = "../img/enemy1.png";
//         // enemy[i].classList.add("car", "enemy");
//         enemies[i].create();
//         enemies[i].y = (i + 1) * 100;
//         // enemy[i].style.top = enemy[i].y + "px";
//     }
//     document
//         .querySelectorAll(".enemy")
//         .forEach((enemy, i) => (enemy.style.top = (2 * i + 1) * -100) + "px");
// }

function moveEnemy() {
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach((enemy) => {
        let enemyYChoords = enemy.y;
        enemyYChoords += player.speed - 2;
        enemy.style.top = enemyYChoords + "px";
    });
}

function createEnemies() {
    for (let i = 0; i <= gameSetting.traffic; i++) {
        let enemy = new Car(
            "../img/enemy1.png",
            2,
            (2 * i + 1) * -100,
            "enemy",
            "car"
        );

        enemy.create();
    }
}
