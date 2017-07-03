// Sketch.js, the control file for the New Rocket project, owner Sam Whelan
// This file shall have the setup and draw functions, and all global variables
// It should call a population of species, initialise them, and run them
// Version 1.0

var target; //init the target
var count = 0;

//obstacle coords
var rx;
var ry;
var rh;
var rw;


function setup(){
  createCanvas(600,400);
  target = createVector(width/2,50); //give the target some coords


  //init the obstacle
  rx = width/4;
  ry = (2.5*height)/5;
  rh = 10;
  rw = width/2;
}


function draw(){
  background(0);

  //draw an obstacle
  fill(255);
  rect(rx,ry,rw,rh);


  //draw the target;
  noStroke();
  fill(255,0,0);
  ellipse(target.x,target.y,15,15);
  fill(255,255,255);
  ellipse(target.x,target.y,10,10);
  fill(255,0,0);
  ellipse(target.x,target.y,5,5);
}
