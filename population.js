// population.js, the constructor function calling a population of x species
// Owned by Sam Whelan, version 1.0


function Population(speciesRockets){
  //init the population, five pops, each with a color and a muation rate
  this.population = [];
  this.newCounts = [30,30,30,30,30];
  this.population.red = [0,0,0,255,255];
  this.population.green = [255,255,0,0,0];
  this.population.blue = [0,255,255,255,0];
  this.population.rate = [0.001,0.005,0.01,0.02,0.05]
  this.matingpoolList = [];

  if (speciesRockets){
    this.speciesRockets = speciesRockets;

    for (var i = 0; i < 4; i++){
      this.population = this.speciesRockets;
    }
  } else{
    for (var i = 0; i < 4; i++){
      this.population[i] = new Species(this.newCounts[i], this.population.rate[i]);
    }
  }


  this.run = function(){
    for (var i = 0; i < 4; i++){
      fill(this.population.red[i],this.population.green[i],this.population.blue[i],127);
      this.population[i].run();
    }



  }// end of this.run function
}//end of population function;
