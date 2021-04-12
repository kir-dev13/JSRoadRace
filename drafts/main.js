let block = document.querySelector(".rectangle");
let moveX = 0;
let blockXChoords = block.offsetLeft;

function drawBlock() {
    block.style.left = blockXChoords + "px";
    console.log(block.style.left);
}

/* window.setInterval(changeXChoords, 100); */
requestAnimationFrame(changeXChoords);

function changeXChoords() {
    if (moveX !== 0) {
        console.log("работает");
        blockXChoords += moveX;
        drawBlock();
    }
    requestAnimationFrame(changeXChoords);
}

function move(event) {
    // event.preventDefault();
    switch (event.keyCode) {
        case 37:
            block.style.transform = "rotate(-10deg)";
            moveX = -1;
            console.log(moveX);
            return moveX;
        case 39:
            block.style.transform = "rotate(10deg)";
            moveX = 1;
            console.log(moveX);
            return moveX;
    }
}

function reMove(event) {
    event.preventDefault();
    /* 		switch (event.keyCode) {
  case 37:
  moveX = 0;
      block.style.transform = 'rotate(0deg)'    
        case 39:
        moveX = 0;
        block.style.transform = 'rotate(0deg)'
		  } */
    if (event.keyCode == 37) {
        moveX = 0;
        block.style.transform = "rotate(0deg)";
    }
    if (event.keyCode == 39) {
        moveX = 0;
        block.style.transform = "rotate(0deg)";
    }

    /* if (event.keyCode == 37) || (event.keyCode == 39) {
      
      } */
    move();
}

// function checkKeyUp(event) {
//   event.preventDefault();
//   if (event.keyCode == 37 && event.keyCode == 39) {
//     reMove();
//   }
// }

document.body.addEventListener("keydown", move);

document.body.addEventListener("keyup", reMove);
