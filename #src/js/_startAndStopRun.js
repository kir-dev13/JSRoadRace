function startRun(event) {
    event.preventDefault();
    // console.log("start");
    keys[event.key] = true;
    switch (event.keyCode) {
        case 38:
            if (event.repeat) {
                break;
            }
            player.speed += gameSetting.boost;
            break;
        case 40:
            if (event.repeat) {
                break;
            }
            player.speed -= gameSetting.boost - 1;
            break;
    }
}
function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
    switch (event.keyCode) {
        case 38:
            if (event.repeat) {
                break;
            }
            player.speed -= gameSetting.boost;
            break;
        case 40:
            if (event.repeat) {
                break;
            }
            player.speed += gameSetting.boost - 1;
            break;
    }
    // console.log("stop");
}
