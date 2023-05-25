

//! Board
var blockSize = 25;
var cols = 30;
var rows = 30;
var board;
var context;
var scoreText;
var highestTextScore;


//! Game;
var gameRunning = false;
var gameSpeed = 100;
var xVelocity = 0;
var yVelocity = 0;
var startBtn;
var score = 0;
var bestScore = 0;

//! Snake
var headX = blockSize * 3;
var headY = blockSize * 3;
var snake = [];

//! Food
var foodX;
var foodY;

window.addEventListener("keydown", changeDirection);
console.log(startBtn);
//startBtn.addEventListener("click", start);

window.onload = function() {
    board = document.querySelector("#gameBoard");
    startBtn = document.querySelector("#startButton");
    scoreText = document.querySelector("#scoreText");
    highestTextScore = document.querySelector("#highestScoreText");
    console.log(startBtn);
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    //Draw snake head
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);
    // context.fillStyle="green";
    // context.fillRect(headX,headY,blockSize,blockSize);
    startBtn.addEventListener("click", start);
    //start();
}


function start(){
    score = 0;
    xVelocity = blockSize;
    yVelocity = 0;
    snake=[{x:headX,y:headY}];
    gameRunning = true;
    startBtn.disabled = true;
    createFood();
    drawFood();
    update();
}

function update(){
    if(gameRunning){
        setTimeout(()=>{
            clearGameBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            update();

        }, gameSpeed);
    }
    else{
        gameOver();
    }
}

function createFood(){
    function randomFood(min,max){
        const randNum = Math.round((Math.random()*(max-min) + min)/blockSize)*blockSize;
        return randNum;
    }
    foodX = randomFood(0, board.width - blockSize);
    foodY = randomFood(0, board.height - blockSize);
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize);
}

function clearGameBoard(){
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);
}

function moveSnake(){
    const newHead = {x:snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(newHead);
    //* Food eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        //clearGameBoard();
        //drawSnake();
        createFood();
        //drawFood();
        scoreText.textContent =score;
        console.log(score);
    }   
    else{
        snake.pop();
    }
}

function drawSnake(){
    context.fillStyle = "green";
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x,snakePart.y,blockSize,blockSize)
    })
}

function changeDirection(e){
    const keyPressed = e.keyCode;
    const UP = 38;
    const DOWN = 40;
    const LEFT = 37;
    const RIGHT = 39;
    const goingUp = (yVelocity == -blockSize);
    const goingDown = (yVelocity == blockSize);
    const goingLeft = (xVelocity == -blockSize);
    const goingRight = (xVelocity == blockSize);
    
    switch(true){
        case(keyPressed == UP && !goingDown):
            yVelocity = -blockSize;
            xVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            yVelocity = blockSize;
            xVelocity = 0;
            break;
        case(keyPressed == LEFT &&!goingRight):
            xVelocity = -blockSize; 
            yVelocity = 0;
            break;
        case(keyPressed == RIGHT &&!goingLeft):
            xVelocity = blockSize;
            yVelocity = 0;
            break;
    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            gameRunning = false;
            break;
        case(snake[0].x >= board.width):
            gameRunning = false;
            break;
        case(snake[0].y < 0):
            gameRunning = false;
            break;
        case(snake[0].y >= board.height):
            gameRunning = false;
            break;
    }
    for(let i = 1; i<snake.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            gameRunning = false;
        }

    }
}

function gameOver(){
    context.font = "50px Courier New";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over",board.width/2,board.height/2);

    if(score > bestScore){
        bestScore = score;
        highestScoreText.textContent =score;
    }
    
    startBtn.disabled = false;
}
