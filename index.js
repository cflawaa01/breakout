const canvaswidth = 800;
const canvasheight = 600;
var blocks =[];
document.querySelector("canvas").width = canvaswidth;
document.querySelector("canvas").height = canvasheight;
class Blocks{
    constructor(x,y){
        this.size = {width:80,height:30};
        this.position = {x,y}
    }

}
for(i=1;i<7;i++){
    for(x=0;x<9;x++){
        const block = new Blocks(10+100*x, i*40);
        blocks.push(block);
        
    }
}

let randomStartX = randomX();
document.querySelector("button").onclick =function(){ 
  myInterval = setInterval(() =>{
    updateCanvas()
},20)};

function randomX(){
    let random_direction_x = Math.floor(Math.random()*2)
    if (random_direction_x == 0){
        random_direction_x = -1
    }
    return random_direction_x
}
let randomStartY =  randomY();
function randomY(){
    let random_direction_y = Math.floor(Math.random()*2)
    if (random_direction_y == 0){
        random_direction_y = -1
    }
    return random_direction_y
}


let canvasCtx = document.querySelector("canvas").getContext("2d");
let userpaddle = {
    size : {
        height : 5 ,
        width : 110
},
position : {
    x : 345  ,
    y : 570
},
movingLeft : false,
movingRight : false

};
const ball= {
    size : 8,
    position : {
        x : 400 ,
        y : 350
    },
    speed : {

        x: 5,
        y: 5
    } 
   
    }
   


  



canvasCtx.fillStyle = "black";
function renderUserpaddle(){
canvasCtx.fillRect( userpaddle.position.x,userpaddle.position.y,userpaddle.size.width,userpaddle.size.height);
};
document.addEventListener("keydown", (e)=>
{ if (e.code == "ArrowLeft"){
    userpaddle.movingLeft = true
}else if (e.code == "ArrowRight"){
    userpaddle.movingRight = true
}
})
document.addEventListener("keyup", (e)=>
{ if (e.code == "ArrowLeft"){
    userpaddle.movingLeft = false
}else if (e.code == "ArrowRight"){
    userpaddle.movingRight = false
}
})
function moveUserPaddle(){
    if(userpaddle.movingLeft == true && userpaddle.position.x > 0){
        userpaddle.position.x -= 15;

    }else if(userpaddle.movingRight == true && userpaddle.position.x < canvaswidth - userpaddle.size.width){
        userpaddle.position.x +=15;
      
    }

}
function updateCanvas(){
    canvasCtx.clearRect(0,0,canvaswidth,canvasheight);
    moveUserPaddle();
    createBlocks();
    createBall();
    moveBall();
     renderUserpaddle();
     if(ball.position.y+ball.size >=canvasheight) {
        alert("You lose");
        clearInterval(myInterval);
        location.reload();
    }
    if(blocks.length==0){
        alert("Nice one!");
        clearInterval(myInterval);
        location.reload();
    }
}


 function createBlocks(){
    for(i=0;i<blocks.length;i++){
        canvasCtx.fillRect(blocks[i].position.x,blocks[i].position.y,blocks[i].size.width,blocks[i].size.height);
        if (topCollison(blocks[i])||bottomCollison(blocks[i])||leftCollison(blocks[i])||rightCollison(blocks[i])){
            blocks.splice(i,1)
        }
    }
 }


function createBall(){
    canvasCtx.save();
    canvasCtx.beginPath();
canvasCtx.arc(ball.position.x, ball.position.y, ball.size, 0, 2 * Math.PI);
canvasCtx.fillStyle = "blue";
canvasCtx.fill();
canvasCtx.restore();

}

function moveBall(){
    ball.position.x += randomStartX *ball.speed.x;
    ball.position.y += randomStartY *ball.speed.y
if (ball.position.x+ball.size >= canvaswidth || ball.position.x-ball.size <= 0){
    ball.speed.x *=-1
}else if (ball.position.y-ball.size <= 0 ){
    ball.speed.y *=-1
}  

if (topCollison(userpaddle)){
    ball.speed.y *=-1
}
for(i=0;i<blocks.length;i++){
    if (topCollison(blocks[i])||bottomCollison(blocks[i])){
        ball.speed.y *=-1}
        else if(leftCollison(blocks[i])||rightCollison(blocks[i])){
            ball.speed.x *=-1
        }
    }
}

function collisonCheck(object){
            return ball.position.x-ball.size< object.position.x+object.size.width&&
            ball.position.x +ball.size> object.position.x &&
            ball.position.y+ball.size > object.position.y &&
            ball.position.y-ball.size< object.position.y+object.size.height
        }
function topCollison(object){
    return collisonCheck(object)&& ball.position.y+ball.size-object.position.y<=3
}
function bottomCollison(object){
    return collisonCheck(object)&& ball.position.y-ball.size -object.position.y-object.size.height>=-3
}
function rightCollison(object){
    return collisonCheck(object)&& ball.position.x-ball.size<=object.position.x+object.size.width
}
function leftCollison(object){
    return collisonCheck(object)&& ball.position.x+ball.size>=object.position.x
}
