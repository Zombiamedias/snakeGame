// Define HTMl elements
const board = document.getElementById('gameBoard');
const instructionText = document.getElementById('instructionText')
const logo = document.getElementById('logo');

// Define game variables
const gridSize = 20 ;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw game map, snake & food
function draw() {
  board.innerHTML = '';
  drawSnake();
  drawFood()
}

// Draw Snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement,segment);
    board.appendChild(snakeElement);
  });
}

// Create a snake or food cube
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set position of snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}
//  Testing draw function
// draw();


// Draw Food
function drawFood() {
  const foodElement = createGameElement('div', 'food')
  setPosition(foodElement, food)
  board.appendChild(foodElement)
 }
// Generate Food
function generateFood(){
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y }
}

// Move the Snake
function move() {
  const head = { ...snake[0] }
  switch (direction) {
    case 'right':
      head.x++
      break;
    case 'left':
      head.x--
      break;
    case 'up':
      head.y--
      break;
    case 'down':
      head.y++
      break;
  }
  snake.unshift(head);
  // snake.pop();
  if (head.x === food.x && head.y === food.y) {
    food = generateFood
    increaseSpeed()
    clearInterval(gameInterval); //clear past interval
    gameInterval = setInterval(()=>{
      move();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// test moving 
// setInterval(() =>{
//   move(); //move first
//   draw(); //draw a new position
// }, 1000);

// Start Game Function
function startGame() {
  gameStarted = true; // Keep track of a running game
  instructionText.style.display= 'none';
  logo.style.display='none';
  gameInterval = setInterval( ()=> {
    move();
    // checkCollition();
    draw();
  }, gameSpeedDelay);
}

// Keep event listener
function handleKeyPress(e) {
  if (
    (!gameStarted && e.code === 'Space') || (!gameStarted && e.key === ' ')
) {
    startGame()
  }else{
    switch (e.key) {
      case 'ArrowUp':
        direction= 'up';
        break;
      case 'ArrowDown':
        direction= 'down';
        break;
      case 'ArrowLeft':
        direction= 'left';
        break;
      case 'ArrowRight':
        direction= 'right';
        break;
    }
  }
}
document.addEventListener('keydown',handleKeyPress);

function increaseSpeed() {
  // console.log(gameSpeedDelay);
  if (gameSpeedDelay>150) {
    gameSpeedDelay -= 5;
  }
}
