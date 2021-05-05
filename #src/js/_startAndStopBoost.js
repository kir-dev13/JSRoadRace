let boostDelta = 0,
    boostStop = false;

function startBoost(event) {
    event.preventDefault();

    keys[event.key] = true;
    switch (event.keyCode) {
        case 38:
            if (event.repeat) {
                break;
            }
            engine.stop();
            engine.fade(0.32, 0.5, 1000, engine.play("boost"));
            boostStop = false;
            requestAnimationFrame(function boosting() {
                boostDelta += 0.01;
                player.speed += 0.01;
                if (boostDelta >= gameSetting.boost || boostStop == true) {
                    engine.stop();
                    engine.play("fast");
                    return;
                }
                requestAnimationFrame(boosting);
            });
            break;
        case 40:
            if (event.repeat) {
                break;
            }
            boostStop = false;
            // player.speed -= gameSetting.boost - 1;
            // break;
            requestAnimationFrame(function boosting() {
                boostDelta -= 0.01;
                player.speed -= 0.01;

                if (
                    boostDelta <= gameSetting.boost * -1 + 1 ||
                    boostStop == true
                ) {
                    return;
                }
                requestAnimationFrame(boosting);
            });
            break;
    }
}
function stopBoost(event) {
    event.preventDefault();
    keys[event.key] = false;
    switch (event.keyCode) {
        case 38:
            if (event.repeat) {
                break;
            }
            engine.fade(0.5, 0, 900, engine.stop());
            engine.fade(0.32, 0.5, 1000, engine.play("move"));
            boostStop = true;
            requestAnimationFrame(function unBoosting() {
                boostDelta -= 0.01;
                player.speed -= 0.01;
                if (boostDelta <= 0) {
                    player.speed = Math.round(player.speed);
                    // engine.stop();
                    engine.fade(0.5, 0, 900, engine.stop());
                    engine.fade(0.32, 0.5, 1000, engine.play("move"));

                    return;
                }
                requestAnimationFrame(unBoosting);
            });
            break;

        case 40:
            if (event.repeat) {
                break;
            }
            // player.speed += gameSetting.boost - 1;
            boostStop = true;
            // player.speed -= gameSetting.boost;
            requestAnimationFrame(function unBoosting() {
                boostDelta += 0.01;
                player.speed += 0.01;

                if (boostDelta >= 0) {
                    player.speed = Math.round(player.speed);

                    return;
                }
                requestAnimationFrame(unBoosting);
            });
            break;
    }
    // console.log("stop");
}
