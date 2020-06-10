const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

//create unit

const box = 30;

//load image

const ground = new Image();
ground.src = 'img/ground.jpeg';

const foodImg = new Image();
foodImg.src = 'img/food.png';
foodImg.width = 10;
foodImg.height = 10;
//load audio
const eat = new Audio();	
   eat.src = 'audio/pureskelu.mp3';

const btn = new Audio();
   btn.src = 'audio/CLICK2.WAV';
   
const over = new Audio();
   over.src = 'audio/smb_gameover.wav';   
//create snake

let snake = [];

snake[0] = {
	x : 9*box,
    y : 10*box
}

//create food

let food = {
	x : Math.floor(Math.random() * 17 +1 ) * box,
	y : Math.floor(Math.random() * 15 +3 ) * box
}

//create the score

let score = 0;
let d;

//snake control
document.addEventListener('keydown',direction);

function direction(event){
	if(event.keyCode == 37 && d != "RIGHT" ){
		d ="LEFT";
		btn.play();
	}else if(event.keyCode == 38  && d != "DOWN" ){
		d ="UP";
		btn.play();
	}else if(event.keyCode == 39 && d != "LEFT"){
		d ="RIGHT";
		btn.play();
	}else if(event.keyCode == 40 && d != "UP"){
		d ="DOWN";
		btn.play();
	}
}

//draw everything to the canvas

function draw(){
	ctx.drawImage(ground,0,0,608,608);
	for( let i=0; i<snake.length; i++ ){
		ctx.fillStyle = i ==0 ? 'green' : 'white';
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);		
	}
	ctx.drawImage(foodImg,food.x,food.y,20,20);
	//old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y){
		score++;
		eat.play();
		
		food = {
			x : Math.floor(Math.random() * 17 +1 ) * box,
			y : Math.floor(Math.random() * 15 +3 ) * box
		}

	}else{
       //snake tail remove
	   snake.pop();
	}
	
	//which derection
	if(d == "LEFT") snakeX-=box;
	if(d == "UP")    snakeY-=box;
	if(d == "RIGHT")  snakeX+=box;
	if(d == "DOWN")   snakeY+=box;
	let newHead = {
		x : snakeX,
		y : snakeY
	}
    function collision(head,array){
		for(let i=0;i<array.length;i++){
			if(head.x == array[i].x && head.y == array[i].y){
				return true;
			}
		}
		return false;
	}
	//game over
	if(snakeX < 0 || snakeX > 600 || snakeY < 0 || snakeY > 600 || collision(newHead, snake)){
		clearInterval(game);
		over.play();
	}	

	snake.unshift(newHead);
	ctx.fillStyle = "white";
	ctx.font = '45px change one';
	ctx.fillText(score, 2*box, 1.6*box);
}

//call drae function 100ms

let game = setInterval(draw,100);