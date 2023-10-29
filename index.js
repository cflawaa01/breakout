const canvaswidth = 800;
const canvasheight = 600;
let start = Math.floor(Math.random()*4);
document.querySelector("canvas").width = canvaswidth;
document.querySelector("canvas").height = canvasheight;
let canvasCtx = document.querySelector("canvas").getContext("2d");
let userpaddle = {
    size : {
        height : 15 ,
        width : 110
},
position : {
    x : 345  ,
    y : 510
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
    speed : 3,
    directionX : (x)=>{
        ball.position.x += x*ball.speed
    },
    directionY : (x)=>{
        ball.position.y += x*ball.speed
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
    canvasCtx.clearRect(0,0,canvaswidth,canvasheight)
    moveUserPaddle();
    renderUserpaddle();
    createBall();
    moveBall();
    
    
    
    
   

}
setInterval(() =>{
    updateCanvas()
},20)

/* function createBlocks(){
    for(i=1;i<7;i++){
        const blockrow = new Blocks(10, i*40);
        canvasCtx.fillRect(blockrow.position.x,blockrow.position.y,blockrow.size.width,blockrow.size.height);
   /*  for (i=0;i<8;i++){
        let newblock = new Blocks(i*100+10,50);
        canvasCtx.fillRect(newblock.position.x,newblock.position.y,newblock.size.width,newblock.size.height)
    } */

function createBall(){
    canvasCtx.save();
    canvasCtx.beginPath();
canvasCtx.arc(ball.position.x, ball.position.y, ball.size, 0, 2 * Math.PI);
canvasCtx.fillStyle = "blue";
canvasCtx.fill();
canvasCtx.restore();

}

function moveBall(){
    
    if(start == 0){
   ball.directionX(-1);
   ball.directionY(-1)
    }else if(start == 1){
   ball.directionX(+1);
   ball.directionY(-1)
    
    }else if(start == 2){
   ball.directionX(-1);
   ball.directionY(+1)
    
    }else {
     ball.directionX(+1);
     ball.directionY(+1)

    }
    if(ball.position.x<=0 && start ==0){
        start = 1
    }else if(ball.position.x<=0 && start ==2){
        start = 3}
    else if(ball.position.x>=canvaswidth && start ==1){
            start = 0
    }else if(ball.position.x>=canvaswidth && start ==3){
        start = 2
    }else if(ball.position.y<=0 && start ==0){
        start = 2}
    else if(ball.position.y<=0 && start ==1){
            start = 3}
    else if(ball.position.y >= canvasheight && start ==2){
                start = 0}
    else if(ball.position.y >= canvasheight && start ==3){
                    start = 1}
            
    }

