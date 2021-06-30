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
            // engine.fade(Howler._volume, 0, 1000, engine.play("move"));
            // engine.fade(0, Howler._volume, 3000, engine.play("boost"));
            engine.play("boost");
            boostStop = false;
            requestAnimationFrame(function boosting() {
                boostDelta += 0.01;
                player.speed += 0.01;
                if (boostDelta >= gameSetting.boost) {
                    engine.stop();
                    // engine.play("fast");
                    // engine.fade(Howler._volume, 0, 3000, engine.play("boost"));
                    // engine.fade(
                    //     Howler._volume - 0.1,
                    //     Howler._volume,
                    //     1000,
                    //     engine.play("fast")
                    // );
                    engine.play("fast");
                }
                if (boostDelta >= gameSetting.boost || boostStop == true) {
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
            engine.stop();
            engine.play("slow");
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
            // engine.fade(Howler._volume, 0, 900, engine.stop());
            engine.stop();
            // engine.fade(
            //     Howler._volume - 0.1,
            //     Howler._volume,
            //     1000,
            //     engine.play("move")
            // );
            engine.play("move");
            boostStop = true;
            requestAnimationFrame(function unBoosting() {
                boostDelta -= 0.01;
                player.speed -= 0.01;
                if (boostDelta <= 0) {
                    player.speed = Math.round(player.speed);
                    // engine.stop();
                    // engine.fade(Howler._volume, 0, 500, engine.play("fast"));
                    // engine.fade(
                    //     Howler._volume - 0.1,
                    //     Howler._volume,
                    //     1000,
                    //     engine.play("move")
                    // );
                    // engine.play("move"); //!!!!!!!!!!!

                    return;
                }
                requestAnimationFrame(unBoosting);
            });
            break;

        case 40:
            if (event.repeat) {
                break;
            }
            // engine.fade(Howler._volume, 0, 500, engine.play("slow"));
            engine.stop();
            // engine.fade(0, Howler._volume, 1000, engine.play("move"));
            engine.play("move");

            boostStop = true;

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
