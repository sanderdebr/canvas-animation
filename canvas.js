// elementen definieren
const CANVAS = document.querySelector('canvas');

CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

// c is context, hierin zitten allerlei functies om canvas aan te passen
let c = CANVAS.getContext('2d');

// maakt een vierkant
// c.fillRect(x, y, width, height);
// c.fillStyle = 'rgba(255, 0, 0, .3)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, .3)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, .3)';
// c.fillRect(250, 100, 100, 100);

// // lijn maken
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = '#fa34a3';
// c.stroke();

// // arc / cirkel
// // c.arc(x, y, radius, startAngle, endAngle, drawCounterclockwise);
// // beginPath om pad te stoppen
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// // Meerdere circles maken met for loop

// for (i = 0; i < 240; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var red = Math.floor(Math.random() * 999);
//     var green = Math.floor(Math.random() * 999);
//     var blue = Math.floor(Math.random() * 999);
//     var opacity = Math.floor(Math.random() * 10);
//     var randomColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = randomColor;
//     c.stroke();
// }

// de functie requestAnimationframe roept de functie waar die zelf in zit telkens opnieuw aan (iedere millisec)

let mouse = {
    x: undefined,
    y: undefined
}

let circleAmount = 250;
let maxRadius = 40;
let minRadius = 5;
let speed = 2; 

let colorArray = [
    '#ff0000',
    '#eeeeee',
    '#999999',
    '#666666',
    '#333333',
];

window.addEventListener('mousemove', (event) => {
    // bij welke muis beweging
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener('resize', () => {
    // reponsive maken
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    init();

})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
         if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius++;
            }
        } else if (this.radius > minRadius) {
            this.radius--;
        }

        this.draw();
    }

}

let circleArray = [];

// generating new circle when resizing screen so screen is always filled
function init() {

    circleArray = [];

    for (i = 0; i < circleAmount; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - .5) * speed;
        let dy = (Math.random() - .5) * speed;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

init();

animate();