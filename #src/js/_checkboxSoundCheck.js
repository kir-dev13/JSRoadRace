function checkboxSoundCheck() {
    gameSetting.sound = checkboxSound.checked;
    Howler.mute(!gameSetting.sound);
}

checkboxSoundCheck();

checkboxSound.addEventListener("change", () => {
    checkboxSoundCheck();
    sessionStorage.setItem("checkboxSound", checkboxSound.checked);
});

soundControlBar.addEventListener("input", () => {
    Howler.volume((soundControlBar.value * 0.01).toFixed(2));
});
soundControlBar.addEventListener("change", () => {
    sessionStorage.setItem("volume", Howler._volume);
});
