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
    // задействована в playGame()
    let lines = document.querySelectorAll(".road-mark");
    // console.log(lines);
    lines.forEach(function (line) {
        line.y += player.speed;
        line.style.top = line.y + "px";
        // console.log(player.speed);
        // console.log(line.y);
        if (line.y >= document.documentElement.clientHeight) {
            // line.y = -((3 * windowHeight) / 20);
            line.y = -((3 * windowHeight) / 20 + 35);
        }
    });
}

function moveEnemy() {
    // console.log(document.documentElement.clientHeight);
    let enemies = document.querySelectorAll(".enemy");
    if (enemies.length < gameSetting.traffic) {
        enemy.create(
            random(carWidth, gameArea.offsetWidth - carWidth),
            3 * (gameSetting.traffic + 1) * -150
        );
    }
    for (let n = 0; n < enemies.length; n++) {
        let itemXChoord;
        let itemYChoord = enemies[n].y;
        itemYChoord += player.speed - enemy.speed;
        enemies[n].style.top = itemYChoord + "px";
        if (itemYChoord >= document.documentElement.clientHeight) {
            // console.log("Машина ушла " + enemies[n].style.left);

            let arrEnemiesChoords = {
                x: [],
                y: [],
            };

            itemYChoord = random(-400, 0) - 350;
            itemXChoord = random(carWidth, gameArea.offsetWidth - carWidth);

            enemies.forEach((enemy) => {
                if (enemy.y < document.documentElement.clientHeight) {
                    arrEnemiesChoords.x.push(
                        enemy.getBoundingClientRect().x - leftSide.offsetWidth
                    );
                    arrEnemiesChoords.y.push(enemy.getBoundingClientRect().y);
                    // console.log(enemies[n].style.left, arrEnemiesChoords.x);
                }
            });

            checkCarPossibility();

            function checkCarPossibility() {
                itemYChoord = random(-400, 0) - 350;
                itemXChoord = random(carWidth, gameArea.offsetWidth - carWidth);

                let checkX = arrEnemiesChoords.x.some((item) => {
                    return (
                        itemXChoord > item - carWidth - 10 &&
                        itemXChoord < item + carWidth + 10
                    );
                });

                let checkY = arrEnemiesChoords.y.some((item) => {
                    return (
                        itemYChoord > item - carHeight - 10 &&
                        itemYChoord < item + carHeight + 10
                    );
                });

                console.log(checkX, checkY);

                if (checkX && checkY) {
                    console.log("поменяли");

                    checkCarPossibility();
                } else {
                    enemies[n].style.top = itemYChoord + "px";
                    enemies[n].style.left = itemXChoord + "px";
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

        // moveElement(startBtn);
        player.move();
        moveRoad();
        moveEnemy();
        // enemy.move();
        // moveElement();
        // moveElement(startBtn); // убирание кнопки

        requestAnimationFrame(playGame);
    }
}
