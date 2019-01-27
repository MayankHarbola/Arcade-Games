window.addEventListener("load",startGame);
var canvas;
var context;

var ballX = 425;
var ballY = 300;

var ballSpeedX = 10;
var ballSpeedY = 4;

var brickHeight = 20;
var brickWidth = 80;

var BrickColCnt = 8;
var BrickRowCnt = 3;

var paddleX = 350;

var score = 0;
const PADDLE_WIDTH = 150;
const PADDLE_HEIGHT = 10;

var ballRadius = 10;

var interval;
function startGame() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    var framesPerSecond = 30;
   interval =  setInterval(function () {
        draw();
        move();

    }, 1000 / framesPerSecond); 

    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = calcMousePos(evt);
        paddleX = mousePos.x - (PADDLE_WIDTH/2);// subtracting to hold the center of mouse position
    

    });   
}

function draw() {
    colorRect("#eee", 0, 0, canvas.width, canvas.height);
    colorRect("#0095DD",paddleX,canvas.height-PADDLE_HEIGHT,PADDLE_WIDTH,PADDLE_HEIGHT);
    multipleBox();
    colorCircle("#0095DD",ballX,ballY,ballRadius);
    
}

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

function move() {
    
    if(ballX + ballSpeedX > canvas.width - ballRadius  || ballX + ballSpeedX< ballRadius){
        ballSpeedX = -ballSpeedX;
    }
    if (ballY+ballSpeedY > canvas.height - ballRadius) {
        if (paddleX < ballX && ballX < paddleX + PADDLE_WIDTH ){
            ballSpeedY = -ballSpeedY;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
      
    }
     if(ballY + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;
}


var x = new Array(BrickRowCnt);

for (var i = 0; i < x.length; i++) {
    x[i] = new Array(BrickColCnt);
}
for(var i = 0;i<BrickRowCnt;i++){
    for(var j = 0;j<BrickColCnt;j++){
        x[i][j] = true;
    }
}

function collide(Xpos,Ypos,i,j) {
    // if((ballX< Xpos+brickWidth && ballY < Ypos + brickHeight && ballY>Ypos) || (ballX == Xpos && ballY < Ypos+20 && ballY>Ypos) ){
        if(x[i][j] == true){
        if (ballX > Xpos && ballX < Xpos + brickWidth && ballY > Ypos && ballY < Ypos + brickHeight){
            x[i][j] = false;
            ballSpeedY = -ballSpeedY;
            score++;
            console.log(score);
            if (score == BrickRowCnt * BrickColCnt) {
                alert("YOU WIN, CONGRATS!");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }

}
        }
}

function multipleBox() {
    var Ypos = 10;
    var Xpos = 0;


    for(var i = 0;i<BrickRowCnt;i++){
         Xpos = 0;
    for (var j = 0; j < BrickColCnt; ++j) 
    {
        collide(Xpos, Ypos, i, j);

        if(x[i][j] == true){
            colorRect("#0095DD", Xpos, Ypos, brickWidth, brickHeight);
            // console.log("ab bata");
        }
        Xpos += 100;
       
}
    Ypos += 35;

    }
}


function colorCircle(color, centerX, centerY, radius) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    context.fill();
}
function colorRect(color, postionX, postionY, width, height) {
    context.fillStyle = color;
    context.fillRect(postionX, postionY, width, height);
}