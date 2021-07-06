function startBoost(e) {
    switch (e.keyCode) {
        case 38:
            if (e.repeat) {
                break;
            }
            gameSetting.boostLimit = false;

            engine.stop();
            engine.play("boost");

            requestAnimationFrame(function boosting() {
                gameSetting.boostDelta += 0.01;
                gameSetting.boostDelta = +gameSetting.boostDelta.toFixed(2);
                player.speed += 0.01;
                player.speed = +player.speed.toFixed(2);
                if (gameSetting.boostDelta >= gameSetting.boost) {
                    if (gameSetting.play) {
                        engine.stop();
                        engine.play("fast");
                    }
                }
                if (
                    gameSetting.boostDelta >= gameSetting.boost ||
                    gameSetting.boostLimit === true
                ) {
                    return;
                }
                requestAnimationFrame(boosting);
            });
            break;
        case 40:
            if (e.repeat) {
                break;
            }
            gameSetting.boostLimit = false;
            if (gameSetting.play) {
                engine.stop();
                engine.play("slow");
            }
            requestAnimationFrame(function boosting() {
                gameSetting.boostDelta -= 0.01;
                gameSetting.boostDelta = +gameSetting.boostDelta.toFixed(2);
                player.speed -= 0.01;
                player.speed = +player.speed.toFixed(2);

                if (
                    gameSetting.boostDelta <= gameSetting.boost * -1 + 1 ||
                    gameSetting.boostLimit === true
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

            gameSetting.boostLimit = true;
            requestAnimationFrame(function unBoosting() {
                gameSetting.boostDelta -= 0.01;
                gameSetting.boostDelta = +gameSetting.boostDelta.toFixed(2);
                player.speed -= 0.01;
                player.speed = +player.speed.toFixed(2);
                if (
                    gameSetting.boostDelta <= 0 ||
                    gameSetting.boostLimit === false
                ) {
                    gameSetting.boostLimit = false;
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

            gameSetting.boostLimit = true;

            requestAnimationFrame(function unBoosting() {
                gameSetting.boostDelta += 0.01;
                gameSetting.boostDelta = +gameSetting.boostDelta.toFixed(2);
                player.speed += 0.01;
                player.speed = +player.speed.toFixed(2);

                if (
                    gameSetting.boostDelta >= 0 ||
                    gameSetting.boostLimit === false
                ) {
                    gameSetting.boostLimit = false;
                    return;
                }
                requestAnimationFrame(unBoosting);
            });
            break;
    }
}
