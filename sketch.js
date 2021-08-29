const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var candy_con;
var candy_con_2;
var candy_con_3;
var candy,candy_img;
var rope3;

var bg_img;
var food;
var rabbit;

var cut1,cut2,cut3;
var nom,no;
var nomo,eat,sad;
var mute_btn;
var star,grey,star1,star2;
var star0,staro;
var fr;
var reload;
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var airbloow;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('back_img.jpg');
  no=loadImage("nom/1.1.png");
candy_img = loadImage("candy.png");
 nomo = loadAnimation("nom/1.1.png","nom/1.2.png","nom/1.3.png","nom/1.4.png","nom/1.5.png",
 "nom/1.6.png","nom/1.7.png","nom/1.8.png","nom/1.9.png","nom/1.10.png","nom/1.11.png",
 "nom/1.12.png","nom/1.13.png","nom/1.14.png","nom/1.15.png","nom/1.16.png","nom/1.17.png",
 "nom/1.18.png","nom/1.19.png","nom/1.20.png","nom/1.21.png","nom/1.22.png","nom/1.23.png",
 "nom/1.24.png","nom/1.25.png","nom/1.26.png","nom/1.27.png","nom/1.28.png","nom/1.29.png",
 "nom/1.30.png","nom/1.31.png","nom/1.32.png","nom/1.33.png","nom/1.34.png","nom/1.35.png");

eat = loadAnimation("eat/1.png","eat/2.png","eat/3.png","eat/4.png","eat/5.png",
"eat/6.png","eat/7.png","eat/8.png","eat/9.png","eat/10.png","eat/11.png","eat/12.png"
,"eat/13.png","eat/14.png","eat/15.png","eat/16.png","eat/17.png","eat/18.png","eat/19.png"
,"eat/20.png","eat/21.png","eat/22.png","eat/23.png","eat/24.png","eat/25.png","eat/26.png"
,"eat/27.png","eat/28.png","eat/29.png","eat/30.png","eat/31.png","eat/32.png","eat/33.png"
,"eat/34.png","eat/35.png");

sad = loadAnimation("sad/1.png","sad/2.png","sad/3.png","sad/4.png","sad/5.png",
"sad/6.png","sad/7.png","sad/8.png","sad/9.png","sad/10.png","sad/11.png","sad/12.png"
,"sad/13.png");

bk_song = loadSound("sound.mp3");
eating_sound = loadSound("eating_sound.mp3");
sad_sound = loadSound("sad.wav");
  
star = loadAnimation("yellow.png");
grey = loadAnimation("greystar.png");
  nomo.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  var isMobile =/iPad|iPhone|iPod|Android/i.test(navigator.userAgent);

  if (isMobile){
    
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth+80, displayHeight);

  }else{

    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }
  
  
  frameRate(80);

 // bk_song.play();
  //bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

//var candy_options = {
  //restitution: 0.8
//}

  //candy = Bodies.circle(100,400,15,candy_options);
 // World.add(world,candy);
  //cut 1
  cut1 = createImg('cut0.png');
  cut1.position(380,25);
  cut1.size(50,50);
  cut1.mouseClicked(drop);

   //cut2
   cut2 = createImg('cut0.png');
  cut2.position(830,30);
  cut2.size(50,50);
 cut2.mouseClicked(drop2);
 
   //btn3
   cut3 = createImg('cut0.png');
  cut3.position(830,300);
   cut3.size(60,60);
  cut3.mouseClicked(drop3);

 mute_btn = createImg('mute.png');
 mute_btn.position(50,20);
 mute_btn.size(50,50);
mute_btn.mouseClicked(mute);

 reload = createImg('ReloadPNG.png');
 reload.position(100,20);
 reload.size(50,50);
reload.mouseClicked(restart);
  

 // rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(6,{x:870,y:30});
  rope3 = new Rope(4,{x:831,y:320});

 ground = new Ground(200,canH,2500,20);
  //nomo.frameDelay = 100;
 // eat.frameDelay = 20;
star1 = createSprite(1200,canH-500,30,30);
star1.scale = 0.1;




rope = new Rope(5,{x:380,y:5});
  nom = createSprite(700,canH-60,100,100);
  nom.addImage(no);
  nom.scale = 0.5;

 nom.addAnimation('blink',nomo);
 nom.addAnimation('eating',eat);
 nom.addAnimation('crying',sad);
 nom.changeAnimation('blink');


  
 

  candy = Bodies.circle(600,300,20);
 Matter.Composite.add(rope.body,candy);

  candy_con = new Link(rope,candy);
  candy_con_2 = new Link(rope2,candy);
candy_con_3 = new Link(rope3,candy);

  //fruit_con_2 = new Link(rope2,fruit);
  //fruit_con_3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  bk_song.play();
}

function draw() 
{
  background(51);
  push();
  image(bg_img,0,0,displayWidth+80,displayHeight);
  imageMode(CENTER);
if(candy!=null){
    image(candy_img,candy.position.x,candy.position.y,70,70);}
pop();

  Engine.update(engine);

 rope.show();
 ground.show();
  rope2.show();
 rope3.show();

 
  drawSprites();

  if(collide(candy,nom,80)==true)
 {
    nom.changeAnimation('eating');
    nom.frameDelay = 1;
   
   eating_sound.play();
  
 }

 if(candy!=null && candy.position.y>=547)
  {
    nom.changeAnimation('crying');
   // bk_song.stop();
    sad_sound.play();
    candy=null;
    nom.scale = 2.0;
    
    
     
   }
  
   
}

function drop()
{
 //cut_sound.play();
  rope.break();
  candy_con.detach();
  candy_con = null; 
}

function drop2()
{
 //cut_sound.play();
 rope2.break();
  candy_con_2.detach();
 candy_con_2 = null;
}

function drop3()
{
 // cut_sound.play();
  rope3.break();
 candy_con_3.detach();
 candy_con_3 = null;
}
function restart(){

  location.reload();
}


function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              World.remove(engine.world,candy);
            candy = null;
             return true; 
           }
          else{
           return false;
           }
        }
}



function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

