function stopGame() {
    gameSetting.play = false;
    // player.speed = 0;
}

function startGame() {
    // player.speed = 0;
    gameSetting.play = false;
    timeToStart(); // запуск обратный отсчёт
    setTimeout(() => {
        // запуск playGame после таймера
        title.classList.add("hide"); // закрытие меню
        gameSetting.play = true;
        player.speed = gameSetting.speed;

        //* Функция скрытия кнопки
        requestAnimationFrame(removeStartBtn);

        requestAnimationFrame(playGame);
    }, 3000);
}
