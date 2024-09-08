class Bird {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1) * 3, random(-1, 1) * 3);
    this.acceleration = createVector();
  }

  show() {
    strokeWeight(10);
    stroke(0xfff);
    point(this.position.x, this.position.y);
  }
  movement() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }
  alignment(birds) {
    const perceptionRadius = 50;
    let total = 0;
    let steering = createVector();
    for (const bird of birds) {
      let distance = this.position.dist(bird.position);
      if (distance < perceptionRadius) {
        steering.add(bird.velocity);
        total++;
      }
    }
    if (total > 0) {
      this.acceleration = steering.div(total).sub(this.velocity);
    }
  }
}
