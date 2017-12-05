function setup() {
	createCanvas(800,800);
	background(171,232,230);
	frameRate(130);
}
function draw(){
}
function mouseWheel() {
	background(171,232,230);
}
function mouseDragged(){
	noStroke(0);
	ellipse(mouseX,mouseY,70,10,30);
	fill(0);
}
	