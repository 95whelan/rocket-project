// species.js, the constructor function calling a population of x rockets
// Owned by Sam Whelan, version 1.0


function Species(rocketCount, rate, rockets){
  this.rocketCount = rocketCount;
  this.rocketList = [];
  this.rate = rate;
  this.meanFitness;

  //set up the species, if the selection event precreated rockets, use those.
  if (rockets){
    this.rocketList = rockets;
  } else{
    for (var i = 0; i < this.rocketCount; i++){
      this.rocketList[i] = new Rocket();
    }
  }


  this.run = function(){
    for (var i = 0; i < this.rocketCount; i++){
      this.rocketList[i].update();
      this.rocketList[i].show();
    }

    var tot = 0;
    for (var i = 0; i < this.rocketCount; i++){
      tot = tot + this.rocketList[i].fitness
    }

    this.meanFitness = tot / this.rocketCount;

  }//end of the run function

} //end of Species function

function Matingpool(species){
  this.species = species;
  this.matingpool = [];

  for (var i = 0; i < this.species.rocketCount; i++){
    if (this.species.rocketList[i].obsCrashed || this.species.rocketList[i].wallCrashed){
      var n = floor(this.species.rocketList[i].fitness) * 100
    } else{
      var n = floor(this.species.rocketList[i].fitness) * 200
    }

    for (var j = 0; j < n; j++){
      this.matingpool.push(this.species.rocketList[i]);
    }
  }

}//end of Matingpool function

function Selection(matingpool, rocketCount, rate){
  this.matingpool = matingpool;
  this.rocketCount = rocketCount;
  this.rate = rate;

  this.newRockets = [];

  for (var i = 0; i < this.rocketCount; i++) {
    var parentA = random(this.matingpool).dna;
    var parentB = random(this.matingpool).dna;
    var child = parentA.crossover(parentB);
    child.mutation(this.rate);
    this.newRockets[i] = new Rocket(child);
  }

}//end of selection function
