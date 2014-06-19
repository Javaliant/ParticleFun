// Retrieve canvas
var canvas = document.getElementById( "canvas" );
// Set 2D context 
var cntx = canvas.getContext( "2d" );
// Frames-per-second
var FPS = 30;
// Particle Array
var particles = [];
// Colors for each particle
var colors = ["aqua", "crimson", "green", "blue", "orange", "yellow", "darkorchid", "lime", "maroon", "beige"];

for (i = 0; i < 10; i++) {
    particles.push({
        // Random values for each particle:
        // Position
        x: randNum( 30, canvas.width - 30 ),
        y: randNum( 30, canvas.height - 30 ),
        // Velocity
        vx: randNum( -200, 200 ),
        vy: randNum( -200, 200 ),
        // Acceleration
        ax: randNum( -150, 150 ),
        ay: randNum( -150, 150 ),
        // Uniform Particle size
        radius: 30,
        // Distinct Color
        color: colors[i]
    });
}

// Draw loop function - What changes the contents of frame
function draw() {
    cntx.clearRect( 0, 0, canvas.width, canvas.height ); // Necessary so each iteration 'clears' before updating

    for (i = 0; i < particles.length; i++) {
        var p = particles[i];
        cntx.beginPath();
        cntx.arc( p.x, p.y, p.radius, 0, 2 * Math.PI );
        cntx.fillStyle = p.color;
        cntx.fill();
    }
}

// Update Loop - Actually initializes draw
function update() {
    for (i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Update 
        p.vx += p.ax / FPS;
        p.vy += p.ay / FPS;
        p.x += p.vx / FPS;
        p.y += p.vy / FPS
        // Setting Bounds in frame
        if ((p.x - p.radius) < 0) {
            p.x = p.radius;
            p.vx = -p.vx;
        }
        if ((p.x + p.radius) > canvas.width) {
            p.x = canvas.width - p.radius;
            p.vx = -p.vx;
        }
        if ((p.y - p.radius) < 0) {
            p.y = p.radius;
            p.vy = -p.vy;
        }
        if ((p.y + p.radius) > canvas.height) {
            p.y = canvas.height - p.radius;
            p.vy = -p.vy;
        }
    }
}

function tick() {
    draw();
    update();
}

function randNum(min, max) {
    return Math.random() * (max - min) + min;
}

setInterval(tick, 1000 / FPS);
