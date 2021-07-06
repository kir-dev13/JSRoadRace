// //! не задействованная функция !
// function moveElement(elem) {
//     let canceled = false;
//     return function (elem) {
//         if (canceled) {
//             return;
//         }
//         elem.y += player.speed;
//         elem.style.top = elem.y + "px";
//         console.log(startBtn.y);
//         if (elem.y >= document.documentElement.clientHeight) {
//             elem.remove();
//             canceled = true;
//             console.log("объект " + elem + " покинул предел экрана");
//             return;
//         }
//     };
// }

function moveRoad() {
    // вызывается в playGame()
    let lines = document.querySelectorAll(".road-mark");
    lines.forEach(function (line) {
        line.yElem += player.speed;
        line.style.top = line.yElem + "px";
        if (line.yElem >= document.documentElement.clientHeight) {
            line.yElem = -((3 * windowHeight) / 20 + 35);
        }
    });
}

function moveEnemy(attemptCarAppend) {
    for (let n = 0; n < enemies.length; n++) {
        enemies[n].dataset.yElem =
            +enemies[n].dataset.yElem + player.speed - enemy.speed;

        enemies[n].style.top = enemies[n].dataset.yElem + "px";

        if (
            +enemies[n].dataset.yElem >= document.documentElement.clientHeight
        ) {
            //*удаляем машину если трафик стал меньше, проверяем и меняем координаты, чтобы машины не накладывались
            enemyRepeat(enemies, n, attemptCarAppend);
        }
    }
}

function playGame() {
    if (gameSetting.play) {
        // if (!engine.playing() && gameSetting.sound) {
        //     engine.stop();
        //     engine.fade(0, Howler._volume, 2000, engine.play("move"));
        // }
        // delay(1000).then(() => console.log(boostDelta));
        player.move();
        moveRoad();

        let attemptCarAppend = 0;

        if (enemies.length < player.traffic) {
            createEnemies(enemies.length);
            console.log("добавили");
            checkCarPossibility(enemies, enemies.length - 1, attemptCarAppend);
        }
        scoreCalc();
        moveEnemy(attemptCarAppend);
        checkRoadAccident(enemies);
        requestAnimationFrame(playGame);
    }
}

function checkCarPossibility(enemies, n, attemptCarAppend) {
    enemies[n].dataset.yElem = random(-400, 0) - 350;
    enemies[n].dataset.xElem = random(0, gameArea.offsetWidth - carWidth);

    let checkX = getArrayEnemiesChoords(enemies).x.some((item) => {
        return (
            enemies[n].dataset.xElem > item - carWidth - 10 &&
            enemies[n].dataset.xElem < item + carWidth + 10
        );
    });

    let checkY = getArrayEnemiesChoords(enemies).y.some((item) => {
        return (
            enemies[n].dataset.yElem > item - carHeight - 15 &&
            enemies[n].dataset.yElem < item + carHeight + 15
        );
    });

    if (checkX && checkY) {
        attemptCarAppend = attemptCarAppend + 1;

        if (attemptCarAppend === 5) {
            enemies[n].remove();
            enemies.splice(n, 1);
            return;
        }
        checkCarPossibility(enemies, n, attemptCarAppend);
    } else {
        enemies[n].style.top = enemies[n].dataset.yElem + "px";
        enemies[n].style.left = enemies[n].dataset.xElem + "px";
        return;
    }
}

function getArrayEnemiesChoords(array) {
    let arrEnemiesChoords = {
        x: [],
        y: [],
    };

    array.forEach((item) => {
        if (+item.dataset.yElem < document.documentElement.clientHeight) {
            arrEnemiesChoords.x.push(
                item.getBoundingClientRect().x - leftSide.offsetWidth
            );
            arrEnemiesChoords.y.push(item.getBoundingClientRect().y);
        }
    });
    return arrEnemiesChoords;
}

function enemyRepeat(enemies, n, attemptCarAppend) {
    if (enemies.length > player.traffic) {
        enemies[n].remove();
        enemies.splice(n, 1);
        return;
    }
    checkCarPossibility(enemies, n, attemptCarAppend);
}

function checkRoadAccident(array) {
    for (let i = 0; i < array.length; i++) {
        if (
            +player.car.dataset.yElem <=
                array[i].getBoundingClientRect().y + carHeight &&
            +player.car.dataset.yElem + carHeight >=
                array[i].getBoundingClientRect().y &&
            player.car.dataset.xElem <=
                array[i].getBoundingClientRect().x -
                    leftSide.offsetWidth +
                    carWidth &&
            +player.car.dataset.xElem >=
                array[i].getBoundingClientRect().x -
                    leftSide.offsetWidth -
                    carWidth
        ) {
            title.classList.remove("hide");
            titleWord.innerHTML = "Авария!";
            // console.error("ДТП!");
            player.car.style.border = "1px solid red";
            // engine.stop();
            crush.play();
            stopGame();
            setTimeout(restartGame, 2000);
            // gameSetting.play = false;
        }
    }
}

function scoreCalc() {
    player.score += Math.round(player.speed);
    // player.score = (player.score / 100).toFixed(0);
    // player.score += Math.round(player.speed);
    // player.score = player.score.toString();
    // player.score = player.score.slice(0, -2);
    scoreDiv.innerText = `Набрано очков: ${player.score}`;
    // if ((player.score / 100).toFixed(0) % 200 == 0 && player.score > 1000) {
    //     console.log("добавим машинку");
    //     player.traffic++;
    // }
}
