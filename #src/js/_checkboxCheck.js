function checkboxSoundCheck(e) {
    // if (e.target.checked) {
    //     console.log("Выбран");
    //     obj[param] = e.target.checked;
    // } else {
    //     console.log("Не Выбран");
    //     param = false;
    // }
    // obj[param] = e.target.checked;
    // console.log(e.target.checked);
    gameSetting.sound = e.target.checked;
    if (!gameSetting.sound) {
        engine.mute(true);
    } else {
        engine.mute(false);
    }
}
