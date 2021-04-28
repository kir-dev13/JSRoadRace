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
        //! запушить ещё одного enemy
        // enemies.push()
    }

    for (let n = 0; n < enemies.length; n++) {
        // console.log("enemies[n] " + enemies[n]);
        // console.log(enemies[n]);
        // let itemXChoord;
        // itemYChoord = enemies[n].style.top;
        // itemYChoord = +itemYChoord.slice(0, itemYChoord.length - 2);
        //
        // enemies[n].style.top = itemYChoord + "px";
        // enemies[n].car.dataset.yElem = +enemies[n].dataset.yElem;
        // console.log(enemies[n]);
        // console.log("enemies[n].dataset.yElem: " + enemies[n].dataset.yElem);

        // itemYChoord = enemies[n].yElem;

        enemies[n].dataset.yElem =
            +enemies[n].dataset.yElem + player.speed - enemy.speed;
        enemies[n].style.top = enemies[n].dataset.yElem + "px";
        if (
            +enemies[n].dataset.yElem >= document.documentElement.clientHeight
        ) {
            let arrEnemiesChoords = {
                x: [],
                y: [],
            };

            enemies[n].dataset.yElem = random(-400, 0) - 350;
            enemies[n].dataset.xElem = random(
                0,
                gameArea.offsetWidth - carWidth
            );

            enemies.forEach((enemy) => {
                if (
                    +enemy.dataset.yElem < document.documentElement.clientHeight
                ) {
                    arrEnemiesChoords.x.push(
                        enemy.getBoundingClientRect().x - leftSide.offsetWidth
                    );
                    arrEnemiesChoords.y.push(enemy.getBoundingClientRect().y);
                }
            });

            // checkCarPossibility(
            //     enemies[n],
            //     enemies[n].dataset.yElem,
            //     enemies[n].dataset.xElem,
            //     arrEnemiesChoords.x,
            //     arrEnemiesChoords.y
            // );
            checkCarPossibility();

            function checkCarPossibility() {
                enemies[n].dataset.yElem = random(-400, 0) - 350;
                enemies[n].dataset.xElem = random(
                    carWidth,
                    gameArea.offsetWidth - carWidth
                );

                let checkX = arrEnemiesChoords.x.some((item) => {
                    return (
                        enemies[n].dataset.xElem > item - carWidth - 10 &&
                        enemies[n].dataset.xElem < item + carWidth + 10
                    );
                });

                let checkY = arrEnemiesChoords.y.some((item) => {
                    return (
                        enemies[n].dataset.yElem > item - carHeight - 15 &&
                        enemies[n].dataset.yElem < item + carHeight + 15
                    );
                });

                if (checkX && checkY) {
                    console.log("поменяли");

                    checkCarPossibility();
                } else {
                    enemies[n].style.top = enemies[n].dataset.yElem + "px";
                    enemies[n].style.left = enemies[n].dataset.xElem + "px";
                    return;
                }
            }
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

// function checkCarPossibility(car, carY, carX, arrayChoordsX, arrayChoordsY) {
//     carY = random(-400, 0) - 350;
//     carX = random(0, gameArea.offsetWidth - carWidth);

//     let checkX = arrayChoordsX.some((item) => {
//         return carX > item - carWidth - 10 && carX < item + carWidth + 10;
//     });

//     let checkY = arrayChoordsY.some((item) => {
//         return carY > item - carHeight - 15 && carY < item + carHeight + 15;
//     });

//     if (checkX && checkY) {
//         console.log("поменяли");

//         checkCarPossibility();
//     } else {
//         car.style.top = carY + "px";
//         car.style.left = carX + "px";
//         return;
//     }
// }
