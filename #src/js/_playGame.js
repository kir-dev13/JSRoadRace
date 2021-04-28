// //! не задействованная функция !
// function moveElement(elem) {
//     let canceled = false;
//     return function (elem) {
//         if (canceled) {
//             return;
//         }
//         elem.y += player.speed;
//         elem.style.top = elem.y + "px";
//         // console.log(startBtn.y);
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
// let itemYChoord;
function moveEnemy() {
    // console.log("enemy: " + enemy);
    let enemies = document.querySelectorAll(".enemy");

    if (enemies.length < player.traffic) {
        enemy.create(
            random(carWidth, gameArea.offsetWidth - carWidth),
            3 * (player.traffic + 1) * -150
        );
        // ! запушить ещё одного enemy
        enemies = document.querySelectorAll(".enemy");
    }

    for (let n = 0; n < enemies.length; n++) {
        enemies[n].dataset.yElem =
            +enemies[n].dataset.yElem + player.speed - enemy.speed;

        enemies[n].style.top = enemies[n].dataset.yElem + "px";

        if (
            +enemies[n].dataset.yElem >= document.documentElement.clientHeight
        ) {
            checkCarPossibility(enemies, n);
        }
    }
}

function playGame() {
    if (gameSetting.play) {
        document.addEventListener("keydown", startRun);
        document.addEventListener("keyup", stopRun);
        player.move();
        moveRoad();
        moveEnemy();
        requestAnimationFrame(playGame);
    }
}

function checkCarPossibility(enemies, n) {
    // let checkX = false;
    // let checkY = false;
    // createArrayEnemiesChoords(enemies);
    // console.log(carY);
    enemies[n].dataset.yElem = random(-400, 0) - 350;
    enemies[n].dataset.xElem = random(0, gameArea.offsetWidth - carWidth);

    let checkX = createArrayEnemiesChoords(enemies).x.some((item) => {
        return (
            enemies[n].dataset.xElem > item - carWidth - 10 &&
            enemies[n].dataset.xElem < item + carWidth + 10
        );
    });

    let checkY = createArrayEnemiesChoords(enemies).y.some((item) => {
        return (
            enemies[n].dataset.yElem > item - carHeight - 15 &&
            enemies[n].dataset.yElem < item + carHeight + 15
        );
    });

    if (checkX && checkY) {
        console.log("поменяли");
        checkCarPossibility(enemies, n);
    } else {
        console.log("не поменяли");

        enemies[n].style.top = enemies[n].dataset.yElem + "px";
        enemies[n].style.left = enemies[n].dataset.xElem + "px";
        return;
    }
}

function createArrayEnemiesChoords(array) {
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
