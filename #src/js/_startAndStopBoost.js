let boostDelta = 0,
    boostLimit = false;

function startBoost(e) {
    // e.preventDefault();

    // keys[e.key] = true;

    switch (e.keyCode) {
        case 38:
            if (e.repeat) {
                break;
            }
            boostLimit = false;
            console.log("%c BOOSTING! ", "background: #222; color: #bada55");
            engine.stop();
            engine.play("boost");

            requestAnimationFrame(function boosting() {
                boostDelta += 0.01;
                boostDelta = +boostDelta.toFixed(2);
                player.speed += 0.01;
                player.speed = +player.speed.toFixed(2);
                if (boostDelta >= gameSetting.boost) {
                    if (gameSetting.play) {
                        engine.stop();
                        engine.play("fast");
                    }
                }
                if (boostDelta >= gameSetting.boost || boostLimit === true) {
                    console.log("LIMIT!!!!");

                    return;
                }
                requestAnimationFrame(boosting);
            });
            break;
        case 40:
            if (e.repeat) {
                break;
            }
            boostLimit = false;
            if (gameSetting.play) {
                engine.stop();
                engine.play("slow");
            }
            requestAnimationFrame(function boosting() {
                boostDelta -= 0.01;
                boostDelta = +boostDelta.toFixed(2);
                player.speed -= 0.01;
                player.speed = +player.speed.toFixed(2);

                if (
                    boostDelta <= gameSetting.boost * -1 + 1 ||
                    boostLimit === true
                ) {
                    return;
                }
                requestAnimationFrame(boosting);
            });
            break;
    }
}
function stopBoost(e) {
    // e.preventDefault();
    // keys[e.key] = false;
    switch (e.keyCode) {
        case 38:
            if (gameSetting.play) {
                engine.stop();
                engine.play("move");
            }

            boostLimit = true;
            requestAnimationFrame(function unBoosting() {
                boostDelta -= 0.01;
                boostDelta = +boostDelta.toFixed(2);
                player.speed -= 0.01;
                player.speed = +player.speed.toFixed(2);
                if (boostDelta <= 0 || boostLimit === false) {
                    player.speed = Math.round(player.speed);
                    boostLimit = false;
                    return;
                }
                requestAnimationFrame(unBoosting);
            });
            break;

        case 40:
            if (gameSetting.play) {
                engine.stop();
                engine.play("move");
            }

            boostLimit = true;

            requestAnimationFrame(function unBoosting() {
                boostDelta += 0.01;
                boostDelta = +boostDelta.toFixed(2);
                player.speed += 0.01;
                player.speed = +player.speed.toFixed(2);

                if (boostDelta >= 0 || boostLimit === false) {
                    player.speed = Math.round(player.speed);
                    boostLimit = false;
                    return;
                }
                requestAnimationFrame(unBoosting);
            });
            break;
    }
}
