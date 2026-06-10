/* global $, sessionStorage*/
const snake = {};
////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");

// Game Variables
const apple = {};
var score = 0; // variable to keep track of the score
var started = false; // variable to keep track of whether the game has started

// TODO 4, Part 1: Create the apple variable

// TODO 5, Part 1: Create the snake variable

// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: turn on keyboard inputs
$("body").on("keydown", handleKeyDown);

// start the game
init();

function init() {
  snake.body = [];
  makeSnakeSquare(10, 10);
  makeSnakeSquare(10, 9);
  makeSnakeSquare(10, 8);
  snake.head = snake.body[0];

  makeApple();

  updateInterval = setInterval(update, 100);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * On each update tick update the snake's position and check for
 * collisions with the walls.
 */
function update() {
  if (started) {
    moveSnake();
  }

  if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
  }

  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
}

function checkForNewDirection(event) {
  if (activeKey === KEY.LEFT) {
    snake.head.direction = "left";
  } else if (activeKey === KEY.RIGHT) {
    snake.head.direction = "right";
  } else if (activeKey === KEY.UP) {
    snake.head.direction = "up";
  } else if (activeKey === KEY.DOWN) {
    snake.head.direction = "down";
  }
}

function moveSnake() {
  for (var i = snake.body.length - 1; i > 0; i--) {
    var currentSnakeSquare = snake.body[i];
    var snakeSquareInFront = snake.body[i - 1];

    moveBodyAToBodyB(currentSnakeSquare, snakeSquareInFront);
    repositionSquare(currentSnakeSquare);
  }

  checkForNewDirection();

  if (snake.head.direction === "left") {
    snake.head.column -= 1;
  } else if (snake.head.direction === "right") {
    snake.head.column += 1;
  } else if (snake.head.direction === "up") {
    snake.head.row -= 1;
  } else if (snake.head.direction === "down") {
    snake.head.row += 1;
  }

  repositionSquare(snake.head);
}

function moveBodyAToBodyB(bodyA, bodyB) {
  bodyA.row = bodyB.row;
  bodyA.column = bodyB.column;
  bodyA.direction = bodyB.direction;
}

function hasHitWall() {
  return (
    snake.head.row < 0 ||
    snake.head.row >= ROWS ||
    snake.head.column < 0 ||
    snake.head.column >= COLUMNS
  );
}

function hasCollidedWithApple() {
  return snake.head.row === apple.row && snake.head.column === apple.column;
}

function handleAppleCollision() {
  // increase the score and update the score DOM element
  score++;
  scoreElement.text("Score: " + score);

  // Remove existing Apple and create a new one
  apple.element.remove();
  makeApple();

  var row = snake.tail.row;
  var column = snake.tail.column;

  makeSnakeSquare(row, column);
}

function hasCollidedWithSnake() {
  for (var i = 1; i < snake.body.length; i++) {
    var square = snake.body[i];

    if (snake.head.row === square.row && snake.head.column === square.column) {
      return true;
    }
  }

  return false;
}

function endGame() {
  // stop update function from running
  clearInterval(updateInterval);
  started = false; // reset the started variable

  // clear board of all elements
  board.empty();

  // update the highScoreElement to display the highScore
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;

  // restart the game after 500 ms
  setTimeout(init, 500);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* Create an HTML element for the apple using jQuery. Then find a random
 * position on the board that is not occupied and position the apple there.
 */
function makeApple() {
  // TODO 4, Part 2: Fill in this function's code block
  apple.element = $("<div>").addClass("apple").appendTo(board);

  var randomPosition = getRandomAvailablePosition();

  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  repositionSquare(apple);
}

/* Create an HTML element for a snakeSquare using jQuery. Then, given a row and
 * column on the board, position it on the screen. Finally, add the new
 * snakeSquare to the snake.body Array and set a new tail.
 */
function makeSnakeSquare(row, column) {
  // TODO 5, Part 2: Fill in this function's code block
  // initialize a new snakeSquare Object
  const snakeSquare = {};

  // make the snakeSquare element and add it to the board
  snakeSquare.element = $("<div>").addClass("snake").appendTo(board);

  // assign the row and column position
  snakeSquare.row = row;
  snakeSquare.column = column;

  // set the snake’s position visually
  repositionSquare(snakeSquare);

  // if this is the head, give it a unique ID
  if (snake.body.length === 0) {
    snakeSquare.element.attr("id", "snake-head");
  }

  // add the square to the snake’s body and update the tail
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

/* 
  event.which returns the keycode of the key that is pressed when the
  keydown event occurs
  
  The KEY Object creates a map for the Arrow Keys to their keycode:

    KEY.LEFT = 37
    KEY.UP = 38
    KEY.RIGHT = 39
    KEY.DOWN = 40
*/
function handleKeyDown(event) {
  activeKey = event.which;

  if (
    event.which === KEY.LEFT ||
    event.which === KEY.RIGHT ||
    event.which === KEY.UP ||
    event.which === KEY.DOWN
  ) {
    started = true;
  }
}

/* Given a gameSquare (which may be a snakeSquare or the apple), position
 * the gameSquare on the screen.
 */
function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;

  var buffer = 20;

  // position the square on the screen according to the row and column
  squareElement.css("left", column * SQUARE_SIZE + buffer);
  squareElement.css("top", row * SQUARE_SIZE + buffer);
}

/* Returns a (row,column) Object that is not occupied by another game component
 */
function getRandomAvailablePosition() {
  var spaceIsAvailable;
  var randomPosition = {};

  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;

    for (var i = 0; i < snake.body.length; i++) {
      if (
        randomPosition.row === snake.body[i].row &&
        randomPosition.column === snake.body[i].column
      ) {
        spaceIsAvailable = false;
      }
    }
  }

  return randomPosition;
}

function calculateHighScore() {
  // retrieve the high score from session storage if it exists, or set it to 0
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }

  return highScore;
}
