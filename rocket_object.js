function Rocket(dna){
  this.pos = createVector(width/2,height);
  this.vel = createVector();
  this.acc = createVector();
  if (dna){
    this.dna = dna;
  }
  else{
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function(){
    this.applyForce(this.dna.genes[count]);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function(){
    push();
    noStroke();
    fill(255,127);
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0,0,25,7);
    pop();
  }

  this.calcFit = function(){
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
  }
}


function DNA(genes){
  if (genes){
    this.genes = genes;
  }
  else{
    this.genes = [];
    for (var i = 0; i < lifespan; i++){
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.1);
    }
  }

  this.crossover = function(partner){
    var newgenes = [];
    var mid = floor(random(this.genes.length));
    for (var i = 0; this.genes.length; i++){
      if (i > mid){
        newgenes[i] = this.genes[i];
      }
      else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }
}
