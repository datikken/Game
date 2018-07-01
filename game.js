//Канвас
var cvs = document.getElementById("myCanvas");
var ctx = cvs.getContext("2d");
//Картинки
var jason = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
//Ассеты
jason.src = "img/mini_jason.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

//Audio
var fly = new Audio();
var score_audio = new Audio();
var finish = new Audio();

fly.src = "game_audio/fly.mp3";
score_audio.src = "game_audio/score.mp3";
finish.src = "game_audio/sadTrumpet.mp3";


//Отступ для прохода
var gap = 140;
//Распрыжка
document.addEventListener('keydown', moveUp);
function moveUp(){
  fly.play();
  yPos -= 25;
};
//Создание блоков
var pipe = [];
pipe[0] = {
  x : cvs.width,
  y : 0
};
var score = 0;
//Позиция Jason'a
var xPos = 10;
var yPos = 150;
var grav = 1.5;
//Отрисовка
function draw(){
  ctx.drawImage(bg, 0, 0);

  for(var i = 0; i < pipe.length; i++){
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;

//Отрисовка новых препядствий
    if(pipe[i].x == 50){
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      })
    }
//Жизнь
if(xPos + jason.width >= pipe[i].x
  && xPos <= pipe[i].x + pipeUp.width
  && (yPos <= pipe[i].y + pipeUp.height
  || yPos + jason.height >= pipe[i].y + pipeUp.height + gap)
  || yPos + jason.height >= cvs.height - fg.height  )

  location.reload();

//Block passed
  if(pipe[i].x == 5) {
    score++;
    score_audio.play();
  }
  };
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(jason, xPos, yPos);
  yPos += grav;

//score
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);


}



pipeBottom.onload = draw;
