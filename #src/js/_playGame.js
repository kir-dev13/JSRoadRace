function playGame() {
    if (gameSetting.play) {
        document.addEventListener("keydown", startRun);
        document.addEventListener("keyup", stopRun);
        // moveElement(startBtn);
        player.movePlayer();
        moveRoad();

        // moveElement();
        // moveElement(startBtn); // убирание кнопки

        requestAnimationFrame(playGame);
    }
}
