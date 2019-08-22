var Box = function(x, y, z, s, h, c){ // Takes input x, y, z (coordinates), side, height and color
    this.coords = createVector(x, y, z);
    this.size = s;
    this.height = h;
    this.color = c;
};

Box.prototype.display = function(){ // Display in a color
    push();
    translate(this.coords.x, this.coords.y, this.coords.z);
    fill(this.color);
    box(this.size, this.height, this.size);
    pop();
};

// Takes the number of boxes in width and depth, the boxes' size and max
// height and generates a terrain
var Terrain = function(w, d, s, maxH){
    this.boxes = [];
    this.width = w * s; // Total width of the terrain
    this.depth = d * s; // Total depth of the terrain
    var count = 0;
    var startX = random(), zOff = random(), xOff;
    for (var i = 0; i < d * s; i += s){
        xOff = startX;
        for (var j = 0; j< w * s; j += s){
            var n = noise(xOff, zOff); // Noise generated value 
            var h = map(n, 0, 1, 0, maxH); // Height of the box
            var c = map(n, 0, 1, 0, 255); // Color of the box
            this.boxes.push(new Box(j, -h / 2, i, s, h, c));
            xOff += 0.1;
            count++;
            //console.log(xOff);
            //console.log(zOff);
        }
        zOff += 0.1;
    }
};

Terrain.prototype.display = function(){
    for(var i = 0; i < this.boxes.length; i++){
        this.boxes[i].display();
    }
};

var terrain;

function setup() {
	createCanvas(1000, 1000, WEBGL);
    terrain = new Terrain(100, 100, 5, 70);
};

function draw() {
    background(255);
    rotateX(map(mouseY, 0, height, PI / 4, -PI / 4));
    rotateY(map(mouseX, 0, width, -PI / 2, PI / 2));
    translate(-terrain.width / 2, 0, -terrain.depth / 2);
    terrain.display();
}