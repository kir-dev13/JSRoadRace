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

    for (let n = 0; n < enemies.length; n++) {
        let itemXChoord;
        let itemYChoord = enemies[n].y;
        itemYChoord += player.speed - enemy.speed;
        enemies[n].style.top = itemYChoord + "px";

        if (itemYChoord >= document.documentElement.clientHeight) {
            itemYChoord = random(-400, 0) - 350;
            itemXChoord = random(carWidth, gameArea.offsetWidth - carWidth);

            function checkCarPossibility() {
                if (
                    itemXChoord > oneBackX - carWidth - 10 &&
                    itemXChoord < oneBackX + carWidth + 10 &&
                    itemYChoord > oneBackY - 100
                ) {
                    itemYChoord = random(-400, 0) - 350;
                    itemXChoord = random(
                        carWidth,
                        gameArea.offsetWidth - carWidth
                    );
                    checkCarPossibility();
                    console.log("поменяли");
                } else {
                    enemies[n].style.top = itemYChoord + "px";
                    enemies[n].style.left = itemXChoord + "px";
                    return;
                }
            }
            checkCarPossibility();
            oneBackY = itemYChoord;
            oneBackX = itemXChoord;
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
