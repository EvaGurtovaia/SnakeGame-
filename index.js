//const { classDeclaration } = require("babel-types");

const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerID = 0;

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

function startGame() {
    
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerID);
    currentSnake = [2, 1, 0];
    direction = 1;
    score = 0;
    intervalTime = 1000;
    timerID = setInterval(move, intervalTime);
    generateApples();
}

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
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        generateApples();
        score++;
        scoreDisplay.textContent = score;
        clearInterval(timerID);
        console.log(intervalTime);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
        console.log(intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * 100);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

generateApples();

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
                direction = -width;
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

startButton.addEventListener("click", startGame);
