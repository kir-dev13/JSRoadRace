function checkboxSoundCheck() {
    gameSetting.sound = checkboxSound.checked;
    engine.mute(!gameSetting.sound);
}

const checkboxSound = document.querySelector("#checkbox-sound");
if (
    sessionStorage.getItem("checkboxSound") &&
    sessionStorage.getItem("checkboxSound") === "false"
) {
    checkboxSound.checked = false;
} else {
    checkboxSound.checked = true;
}

checkboxSoundCheck();
checkboxSound.addEventListener("change", () => {
    checkboxSoundCheck();
    sessionStorage.setItem("checkboxSound", checkboxSound.checked);
});
const soundControlBar = document.querySelector(".sound__volume");
soundControlBar.value = sessionStorage.getItem("volume") * 100 || 50;
soundControlBar.addEventListener("input", () => {
    Howler.volume((soundControlBar.value * 0.01).toFixed(2));
});
soundControlBar.addEventListener("change", () => {
    sessionStorage.setItem("volume", Howler._volume);
});
