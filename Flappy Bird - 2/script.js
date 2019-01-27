var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "bird.png";
bg.src = "bg.png";
fg.src = "fg.png";
pipeNorth.src = "pipeNorth.png";
pipeSouth.src = "pipeSouth.png";

var gap = 85;
var constant ;
var bx = 10;
var by = 150;
var gravity = 1.5;
var score = 0;

document.addEventListener("keydown",moveUp);

function moveUp() {
    by -=25;
}
var pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}
function draw() {
    context.drawImage(bg,0,0,canvas.width ,canvas.height);
    for(var i = 0;i<pipe.length ; i++){
         constant = pipeNorth.height + gap;

        context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;

        if(pipe[i].x == 600){
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height 
            });
        }
        if (bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (by <= pipe[i].y + pipeNorth.height || by + bird.height >= pipe[i].y + constant) || by + bird.height >= canvas.height - fg.height) {
            location.reload(); // reload the page
        }
        if (pipe[i].x == 5) {
            score++;
            
        }
    }
    
    
    
    context.drawImage(fg,0,canvas.height-fg.height,canvas.width ,canvas.height);
    context.drawImage(bird,bx,by);

    by += gravity;

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);

}
draw();

