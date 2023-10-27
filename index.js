document.querySelector("canvas").width = "800";
document.querySelector("canvas").height = "600";
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
function moveUserPaddle(){


}