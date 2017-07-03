// dna.js, the constructor function for each rocket's dna
// Owned by Sam Whelan, version 1.0

function DNA(genes){
  if (genes){
    this.genes = genes; //we can pass a genes object into the function directly
  }
  else{
    this.genes = [];

    for (var i = 0; i < lifespan; i++){
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(forceMag);
    }
  }

  this.crossover = function(partner){
    var newgenes = [];
    var mid = floor(random(this.genes.length));

    for (i = 0; i < this.genes.length; i++){
      if (i > mid){
        newgenes[i] = this.genes[i];
      }
      else {
        newgenes[i] = partner.genes[i];
      }

    }
    return new DNA(newgenes);
  } //end of crossover function

  this.mutation = function(rate){
    for (i = 0; i < this.genes.length; i++){
      if (random(1) < rate){
        this.genes[i] = p5.Vector.random2D();
      }

    }

  } //end of mutation function
} // end of DNA function
