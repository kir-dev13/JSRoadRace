"use strict";
let count = 0;
function fizzBuss() {
    count++;
    if (count === 1000001) {
        return;
    }
    if (count % 3 == 0 && count % 5 == 0) {
        console.log(count + " FizzBuzz");
    } else if (count % 3 == 0) {
        console.log(count + " Fizz");
    } else if (count % 5 == 0) {
        console.log(count + " Buzz");
    } else {
        console.log(count);
    }

    fizzBuss();
}

fizzBuss();
