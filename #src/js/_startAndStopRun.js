let boostDelta = 0,
    boostStop = false;

function startRun(event) {
    event.preventDefault();

    // console.log("start");
    keys[event.key] = true;
    switch (event.keyCode) {
        case 38:
            if (event.repeat) {
                break;
            }
            boostStop = false;
            // player.speed += gameSetting.boost;
            // (function () {
            //     let boostDelta = 0;
            //     let boostingInterval = setInterval(function () {
            //         boostDelta += 0.5;
            //         player.speed += 0.5;
            //         if (boostDelta >= gameSetting.boost) {
            //             console.log("предел скорости");

            //             clearInterval(boostingInterval);
            //         }
            //     }, 500);
            // })();
            requestAnimationFrame(function boosting() {
                boostDelta += 0.01;
                player.speed += 0.01;
                console.log(player.speed);

                if (boostDelta >= gameSetting.boost || boostStop == true) {
                    console.log("предел скорости");
                    return;
                }
                requestAnimationFrame(boosting);
            });
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
            boostStop = true;
            // player.speed -= gameSetting.boost;
            requestAnimationFrame(function unBoosting() {
                boostDelta -= 0.02;
                player.speed -= 0.02;
                console.log(player.speed);

                if (boostDelta <= 0) {
                    player.speed = Math.round(player.speed);
                    console.log("вернулись");
                    console.log(player.speed);
                    return;
                }
                requestAnimationFrame(unBoosting);
            });
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
