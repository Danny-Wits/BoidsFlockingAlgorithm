class Bird {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector();
  }

  show() {
    strokeWeight(10);
    stroke(122, 255, 122);
    point(this.position.x, this.position.y);
  }
  movement() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }
  alignment(birds) {
    let perceptionRadius = alignmentRadius.value();
    let total = 0;
    let steering = createVector();
    for (const bird of birds) {
      let distance = this.position.dist(bird.position);
      if (this !== bird && distance < perceptionRadius) {
        steering.add(bird.velocity);
        total++;
      }
    }
    if (total > 0) {
      this.acceleration.add(
        steering
          .div(total)
          .sub(this.velocity)
          .setMag(1)
          .mult(alignmentSpeed.value())
          .limit(10)
      );
    }
  }
  cohesion(birds) {
    let perceptionRadius = cohesionRadius.value();
    let total = 0;
    let steering = createVector();
    for (const bird of birds) {
      let distance = this.position.dist(bird.position);
      if (this !== bird && distance < perceptionRadius) {
        steering.add(bird.position);
        total++;
      }
    }
    if (total > 0) {
      this.acceleration.add(
        steering
          .div(total)
          .sub(this.position)
          .setMag(0.1)
          .mult(cohesionSpeed.value())
          .limit(2)
      );
    }
  }
  separation(birds) {
    const perceptionRadius = separationRadius.value();
    let total = 0;
    let steering = createVector();
    for (const bird of birds) {
      let distance = this.position.dist(bird.position);
      if (this !== bird && distance < perceptionRadius) {
        let vec = p5.Vector.sub(this.position, bird.position);
        steering.add(vec.div(distance));
        total++;
      }
    }
    if (total > 0) {
      this.acceleration.add(
        steering
          .div(total)
          .sub(this.velocity)
          .setMag(0.1)
          .mult(separationSpeed.value() * 2)
          .limit(10)
      );
    }
  }
  wall() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x <= 0) {
      this.position.x = width;
    } else if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y <= 0) {
      this.position.y = height;
    }
  }
}
