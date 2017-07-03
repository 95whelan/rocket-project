var population;
var lifespan = 200;
var count = 0;
var lifePara;
var target;



function setup(){
  createCanvas(600,400);
  population = new Population();
  lifePara = createP();
  target = createVector(width/2, 50);
}

function draw(){
  background(127);
  population.run();
  lifePara.html(count);
  count++

  if (count == lifespan){
    population.evaluate();
    population.selection();
    // population = new Population();
    count = 0;
  }

  noStroke();
  fill(255,0,0);
  ellipse(target.x,target.y,15,15);
  fill(255,255,255);
  ellipse(target.x,target.y,10,10);
  fill(255,0,0);
  ellipse(target.x,target.y,5,5);
}
