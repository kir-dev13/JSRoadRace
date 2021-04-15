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

function playGame() {
    if (gameSetting.play) {
        document.addEventListener("keydown", startRun);
        document.addEventListener("keyup", stopRun);
        // moveElement(startBtn);
        player.move();
        moveRoad();
        enemy.move();
        // moveElement();
        // moveElement(startBtn); // убирание кнопки

        requestAnimationFrame(playGame);
    }
}
