function soundPlay(sound) {
    if (gameSetting.sound) {
        sound;
    }
}

function setSoundControlBar() {
    let volumeValue = undefined;
    if (sessionStorage.getItem("volume")) {
        volumeValue = sessionStorage.getItem("volume") * 100;
    }
    volumeValue === 0 ? (volumeValue += 0.01) : volumeValue * 1;
    soundControlBar.value = volumeValue || 50;

    Howler.volume((soundControlBar.value * 0.01).toFixed(2));
    console.log(Howler._volume);
}

function getBooleanDataFromSessionStorage(item, defaultValue = false) {
    switch (sessionStorage.getItem(item)) {
        case "false":
            return false;
            break;
        case "true":
            return true;
            break;
        default:
            return defaultValue;
    }
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeStartBtn() {
    if (startBtn.y >= document.documentElement.clientHeight || !startBtn) {
        startBtn.remove();
        return;
    }
    startBtn.y += player.speed;
    startBtn.style.top = startBtn.y + "px";
    requestAnimationFrame(removeStartBtn);
}
