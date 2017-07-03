// Sketch.js, the control file for the New Rocket project, owner Sam Whelan
// This file shall have the setup and draw functions, and all global variables
// It should call a population of species, initialise them, and run them
// Version 1.0

var target; //init the target
var count = 0;
var rocket;
var lifespan = 400;
var forceMag = 0.1;

//obstacle coords
var rx;
var ry;
var rh;
var rw;


function setup(){
  createCanvas(600,400);
  target = createVector(width/2,50); //give the target some coords
  rocket = new Population();


  //init the obstacle
  rx = width/4;
  ry = (2.5*height)/5;
  rh = 10;
  rw = width/2;
}


function draw(){
  background(0);

  rocket.run();
  count++;

  if (count == lifespan){
    //now establish the highest and lowest, then increment and decrement them

    var highest = 0;
    var hiIndex;
    var lowest = 90000;
    var lowIndex;

    for (var i = 0; i < 4; i++){
      if (rocket.population[i].meanFitness > highest){
        highest = rocket.population[i].meanFitness;
        hiIndex = i;
      }
      if (rocket.population[i].meanFitness < lowest){
        lowest = rocket.population[i].meanFitness;
        lowIndex = i;
      }
    }

    rocket.newCounts[hiIndex]++;
    rocket.newCounts[lowIndex]--;

    //now build each matingpool

    for (var i = 0; i < 4; i++){
      rocket.matingpoolList[i] = new Matingpool(rocket.population[i]);
    }

    //now undergo selection
    rocket.newSpeciesRockets = [];

    for (var i = 0; i < 4; i++){
      rocket.newSpeciesRockets[i] = new Selection(rocket.matingpoolList[i].matingpool,rocket.newCounts[i], rocket.population.rate[i]);
    }

    //now call population again
    rocket = new Population(rocket.newSpeciesRockets.newRockets);
    count = 0;

  } // end of if count == lifespan

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
