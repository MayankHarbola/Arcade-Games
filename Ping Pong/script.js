window.addEventListener('load',gameStart);
var canvas;
var context;

var ballX = 50;
var ballY = 50;

var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y  = 250;
var paddle2Y = 250;

var player1Score = 0;
var player2Score = 0;

const PADDLE_THICKNES = 10;
const PADDLE_HEIGHT = 100;

const WINNING_SCORE = 3;

var winningScreen = false;

function gameStart() {
     canvas = document.getElementById("canvas");
     context = canvas.getContext('2d');
     var framesPerSecond = 30;
    setInterval(function() {
        draw();
        move();
        
    }, 1000/framesPerSecond); 

canvas.addEventListener('mousedown',handelMouseClick);

 canvas.addEventListener('mousemove',function(evt) {
     var mousePos = calcMousePos(evt);
     paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);// subtracting to hold the center of mouse position
    // console.log(mousePos.y);
 });    
}

function handelMouseClick() {
    if(winningScreen){
        player1Score = 0;
        player2Score = 0;
        winningScreen = false;
    }
    
}
function resetMousePos() {
    if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
       winningScreen = true;
    }
    ballSpeedX = -ballSpeedX;

    ballX = canvas.width/2;
    ballY = canvas.height/2;
}


// calculate the mouse position
function calcMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };

}
function computerMovement() {
    var paddle2YCenter = paddle2Y+ (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY - 35){  // - 35 because if it is close to ball then it stop moving without it the paddle is shaking
      paddle2Y += 6;
    } else if (paddle2YCenter > ballY + 35){
        paddle2Y -= 6;
    }
}
function move() {
    if(winningScreen){
        return ;
    }
    
    computerMovement();  // this function auto genrates the postion of second paddle acc to ball postion

    ballX += ballSpeedX;

  
    if(ballX > canvas.width ){   // bounce back if touch to width
        // ballSpeedX = -ballSpeedX;

        // for right side of panel
        if (paddle2Y < ballY && ballY < paddle2Y + PADDLE_HEIGHT) {
            
            ++player2Score;
           ballSpeedX = -ballSpeedX;

            // for improve in the movement of after colliding with paddle 

            var delta = ballY - (paddle2Y + PADDLE_HEIGHT);

            ballSpeedY = delta * 0.35;


        } else {
            resetMousePos();
        }
    }
    if(ballX < 0){ // if a person misses the ball
        
        // for left side of pannel
        if (paddle1Y < ballY && ballY < paddle1Y + PADDLE_HEIGHT) {
            
            ++player1Score;
            ballSpeedX = -ballSpeedX;
            // for improve in the movement of after colliding with paddle 

            var delta = ballY - (paddle1Y + PADDLE_HEIGHT);

            ballSpeedY = delta * 0.35;

           
        }else{
       resetMousePos();
        }
    }
    ballY += ballSpeedY;
    if (ballY > canvas.height || ballY < 0) {   // bounce back if touch to height
        ballSpeedY = -ballSpeedY;
    }
}
function drawNet() {
    for(var i = 0;i<canvas.height;i+=40){
        colorRect('white',canvas.width/2 - 1, i,2, 20);

    }
}
function draw() {
    colorRect('black', 0, 0, canvas.width, canvas.height);
      
    if (winningScreen) {
        context.fillStyle = 'white';
        context.font = "30px Verdana";
        if(player1Score >=  WINNING_SCORE){
            context.fillText("YOU  WON !" , 310, 150);
        }else if (player2Score >= WINNING_SCORE) {
            context.fillText("YOU LOSE !", 310, 150);
           
        }
      
        
        context.fillText("click to continue" , 300, 500);
        return;
    }
    drawNet();
    colorRect('white', 0, paddle1Y, PADDLE_THICKNES, PADDLE_HEIGHT);
    colorRect('white', canvas.width - PADDLE_THICKNES, paddle2Y, PADDLE_THICKNES, PADDLE_HEIGHT);

    colorCircle('white', ballX, ballY, 10);

    context.font = "30px Verdana";
    context.fillText("score : " +  player1Score, 100, 100);
    context.fillText("score : " + player2Score, canvas.width - 300, 100);
}

function colorCircle(color,centerX,centerY,radius) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    context.fill();
}
function colorRect(color,postionX,postionY,width,height) {
    context.fillStyle = color;
    context.fillRect(postionX, postionY, width, height);
}