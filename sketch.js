let birds = [];
let total = 100;
let alignmentRadius;
let cohesionRadius;
let separationRadius;
let alignmentSpeed;
let cohesionSpeed;
let separationSpeed;
let ar;
let cr;
let sr;
let as;
let cs;
let ss;
let tb;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 50);
  ar = createDiv();
  alignmentRadius = createSlider(0, 1000, 200);
  cr = createDiv("Cohesion Radius");
  cohesionRadius = createSlider(0, 1000, 50);
  sr = createDiv("Separation Radius  ");
  separationRadius = createSlider(0, 100, 20);
  as = createDiv("Alignment Force");
  alignmentSpeed = createSlider(0, 20, 8, 0.1);
  cs = createDiv("Cohesion Force  ");
  cohesionSpeed = createSlider(0, 1, 0.1, 0.1);
  ss = createDiv("Separation Force  ");
  separationSpeed = createSlider(0, 10, 0.4, 0.1);
  tb = createDiv("Total  Birds  ");
  totalBirds = createSlider(0, 1000, 100);
  reset = createButton("RESET");
  reset.mousePressed(() => {
    birds = [];
    for (let index = 0; index < totalBirds.value(); index++) {
      birds.push(new Bird());
    }
  });
  for (let index = 0; index < total; index++) {
    birds.push(new Bird());
  }
}
window.addEventListener("resize", () => {
  resizeCanvas(window.innerWidth, window.innerHeight - 50);
});
function draw() {
  background(0x000);
  ar.html("Alignment Radius:" + alignmentRadius.value());
  cr.html("Cohesion Radius:" + cohesionRadius.value());
  sr.html("Separation Radius:" + separationRadius.value());
  as.html("Alignment Force:" + alignmentSpeed.value());
  cs.html("Cohesion Force:" + cohesionSpeed.value());
  ss.html("Separation Force:" + separationSpeed.value());
  tb.html("Total birds:" + totalBirds.value());
  for (const bird of birds) {
    bird.acceleration.set(0, 0);
    bird.alignment(birds);
    bird.cohesion(birds);
    bird.separation(birds);
    bird.movement();
    bird.wall();
    bird.show();
  }
}
