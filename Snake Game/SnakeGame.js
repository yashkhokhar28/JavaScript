const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
//increase snake size 
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
let speed = 7;
let tileCount = 20;

let tileSize = canvas.clientWidth / tileCount - 2;
let headX = 10;
let headY = 10;

// array for snake parts
const snakeParts = [];
let tailLength = 2;

//initialize the speed of snake
let xVelocity = 0;
let yVelocity = 0;

//draw apple
let appleX = 5;
let appleY = 5;

//scores
let score = 0;

// create game loop-to continously update screen
function drawGame() {
  changeSnakePosition();
  // game over logic
  let result = isGameOver();
  if (result) {// if result is true
    return;
  }
  clearScreen();
  drawSnake();
  drawApple();

  checkCollision();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}
//Game Over function
function isGameOver() {
  let gameOver = false;
  //check whether game has started
  if (yVelocity == 0 && xVelocity == 0) {
    return false;
  }
  if (headX < 0) { //if snake hits left wall
    gameOver = true;
  } else if (headX == tileCount) { //if snake hits right wall
    gameOver = true;
  } else if (headY < 0) { //if snake hits wall at the top
    gameOver = true;
  } else if (headY == tileCount) { //if snake hits wall at the bottom
    gameOver = true;
  }

  //stop game when snake crush to its own body

  for (let index = 0; index < snakeParts.length; index++) {
    let part = snakeParts[index];
    if (part.x == headX && part.y == headY) { //check whether any part of snake is occupying the same space
      gameOver = true;
      break; // to break out of for loop
    }
  }
  //display text Game Over
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px verdana";
    ctx.fillText(
      "Game Over !!!",
      canvas.clientWidth / 6.5,
      canvas.clientHeight / 2
    );
  }
  return gameOver; // this will stop execution of drawgame method
}
// score function
function drawScore() {
  ctx.fillStyle = "white"; // set our text color to white
  ctx.font = "10px verdena"; //set font size to 10px of font family verdena
  ctx.fillText("Score : "+score, canvas.clientWidth - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "black"; // make screen black
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawSnake() {
  ctx.fillStyle = "green";
  //loop through our snakeparts array
  for (let index = 0; index < snakeParts.length; index++) {
    let part = snakeParts[index];
    //draw snake parts
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
    //add parts to snake --through push
  snakeParts.push(new snakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift(); //remove furthest item from  snake part if we have more than our tail size
  }
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// check for collision and change apple position
function checkCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

//add event listener to our body
document.body.addEventListener("keydown", keyDown);

function keyDown() {
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = yVelocity - 1;
    xVelocity = 0;
  }
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = xVelocity - 1;
  }
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
}
drawGame();
