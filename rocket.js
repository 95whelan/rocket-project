// rocket.js, the file with the constructor function for each rocket.
// Owned by Sam Whelan, version 1.0

function Rocket(dna){
  //init rocket
  this.pos = createVector(width/2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.fitness = 0; //going to track the fitness each frame
  this.closestApproach = 90000; //init with high value, low is better
  this.time2target;
  this.hitTarget = false;
  this.wallCrashed = false;
  this.obsCrashed = false;
  if (dna){
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }


  //now create the physics engine for the rocket;
  this.applyForce = function(force){
    this.acc.add(force);
  } // end of force function

  //now create the fitness algorithm for the rocket (commenting esp important)
  this.calcFitness = function(){
    //get the distance (d) to the target
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // give high fitness to closer rockets
    this.fitness = map(d, 0, width, width, 0);

    //now adjust the fitness according to certain conditions
    if (this.hitTarget){
      this.fitness *= 5000;
      this.fitness *= floor(lifespan/this.time2target);
    }

    if (this.obsCrashed){
      this.fitness /= 25;
    }

    if (this.wallCrashed){
      this.fitness /= 5;
      this.fitness.add(200/this.closestApproach);
    }
  } // end of fitness function

  this.isCrashed = function(){
    if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh){
      this.obsCrashed = true;
    }

    if (this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 ){
      this.wallCrashed = true;
    }

  } //end of isCrashed function

  this.update = function(){
    //update the positions of the rocket, and all of its tracked variables

    //get the distance to the target, if it's closer than the current closest,
    //push it to the closestApproach variable
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < this.closestApproach){
      this.closestApproach = d;
    }
    this.isCrashed(); //check if the rocket has crashed
    this.calcFitness(); // update the rocket's fitness

    //if the rocket is close to the target, count it as a hit, update its status
    //note the time it took to get there, and shift it to be exactly in the centre.
    if (d < 10){
      if (this.completed == false){
        this.completed = true;
        this.time2target = count;
        this.pos = target.copy();
      }
    }

    this.applyForce(this.dna.genes[count]) //get the next vector from the DNA

    //only actually move the rocket if it hasn't crashed or hit the target
    if (!this.completed && !this.crashed && !this.wallCrashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  } // end of update function

  this.show = function(){
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading()+PI/2); //the rocket should point in the direction of travel
    noStroke();
    triangle(0,0,-5,15,5,15);
    pop();
  } // end of show function




}// end of rocket function
