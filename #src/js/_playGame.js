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
        document.addEventListener("keydown", startBoost);
        document.addEventListener("keyup", stopBoost);
        player.move();
        moveRoad();

        let attemptCarAppend = 0;

        if (enemies.length < player.traffic) {
            createEnemies(enemies.length);
            console.log("добавили");
            checkCarPossibility(enemies, enemies.length - 1, attemptCarAppend);
        }

        moveEnemy(attemptCarAppend);
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
        console.log("поменяли");
        attemptCarAppend = attemptCarAppend + 1;

        if (attemptCarAppend === 5) {
            console.log("УДАЛИЛИ");
            enemies[n].remove();
            enemies.splice(n, 1);
            return;
        }
        checkCarPossibility(enemies, n, attemptCarAppend);
    } else {
        console.log("не поменяли");

        enemies[n].style.top = enemies[n].dataset.yElem + "px";
        enemies[n].style.left = enemies[n].dataset.xElem + "px";
        // enemy.enemies[n].render();
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
    // console.log(arrEnemiesChoords);
    return arrEnemiesChoords;
}

function enemyRepeat(enemies, n, attemptCarAppend) {
    if (enemies.length > player.traffic) {
        console.log("УДАЛИЛИ");
        enemies[n].remove();
        enemies.splice(n, 1);
        return;
    }
    checkCarPossibility(enemies, n, attemptCarAppend);
}
