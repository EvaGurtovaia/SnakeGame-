//const { classDeclaration } = require("babel-types");

const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;

function createGrid() {
    for (let i = 0; i < width * width; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        grid.appendChild(square);
        squares.push(square);
    }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) || //snake hits the bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || //snake hits the right wall
        (currentSnake[0] % width === 0 && direction === -1) || //snake hits the left wall
        (currentSnake[0] - width < width && direction === -width) || // snake hits the top
        squares[currentSnake[0] + direction].classList.contains("snake")
    )
        return clearInterval(timerID);

    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add("snake");
}
move();

const timerID = setInterval(move, 1000);
//clearInterval(timerID);

// function control(event) {
//     if (event.key === 39) {
//         direction = 1;
//     } else if (event.key === 38) {
//         direction = -width;
//     } else if (event.key === 40) {
//         direction = -1;
//     } else if (event.key === 37) {
//         direction = +width;
//     }
// }

window.addEventListener(
    "keydown",
    function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {
            case "Down":
            case "ArrowDown":
                direction = +width;
                break;
            case "Up":
            case "ArrowUp":
                direction = +width;
                break;
            case "Left":
            case "ArrowLeft":
                direction = -1;
                break;
            case "Right":
            case "ArrowRight":
                direction = 1;
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    },
    true
);
