const canvaswidth = 800;
const canvasheight = 600;
let randomStartX = randomX();
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

document.querySelector("canvas").width = canvaswidth;
document.querySelector("canvas").height = canvasheight;
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
   


  

class Blocks{
    constructor(x,y){
        this.size = {width:80,height:30};
        this.position = {x,y}
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
    
    
    
    
   

}
setInterval(() =>{
    updateCanvas()
},20)

 function createBlocks(){
    for(i=1;i<7;i++){
        const blockrow = new Blocks(10, i*40);
        canvasCtx.fillRect(blockrow.position.x,blockrow.position.y,blockrow.size.width,blockrow.size.height);
    for(x=1;x<9;x++){
        const blockcoloum = new Blocks(10+100*x, i*40)
        canvasCtx.fillRect(blockcoloum.position.x,blockcoloum.position.y,blockcoloum.size.width,blockcoloum.size.height);
    }
}}
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
      
if (ball.position.x >= canvaswidth || ball.position.x <= 0){
    ball.speed.x *=-1
}else if (ball.position.y <= 0 || ball.position.y >=canvasheight){
    ball.speed.y *=-1
}    

function collisonCheck(object){
    
            return ball.position.x-ball.size< object.position.x+object.size.width&&
            ball.position.x +ball.size> object.position.x &&
            ball.position.y+ball.size > object.position.y &&
            ball.position.y-ball.size< object.position.y+object.size.height
        }
function topCollison(object){
    return collisonCheck(object)&& ball.position.y+ball.size>=object.position.y
}
function bottomCollison(object){
    return collisonCheck(object)&& ball.position.y-ball.size <=object.position.y+object.size.height
}
function rightCollison(object){
    return collisonCheck(object)&& ball.position.x-ball.size<=object.position.x+object.size.width
}
function leftCollison(object){
    return collisonCheck(object)&& ball.position.x+ball.size>=object.position.x
}
if (topCollison(userpaddle)){
    ball.speed.y *=-1

}



}

