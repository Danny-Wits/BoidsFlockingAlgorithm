const birds = [];
const total = 100;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let index = 0; index < total; index++) {
    birds.push(new Bird());
  }
}
window.addEventListener("resize", () => {
  resizeCanvas(window.innerWidth, window.innerHeight);
});
function draw() {
  background(0x000);
  for (const bird of birds) {
    bird.alignment(birds);
    bird.movement();
    bird.show();
  }
}
