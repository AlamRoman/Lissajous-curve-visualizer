const canvas = document.getElementById("canvas");
const width  = 500;
const height = 500;
const ctx = canvas.getContext("2d");

let a = 200, b = 200, omegaX = 2, omegaY = 7, theta = 10;

let inputOmegaX = document.getElementById("omegaX");
let inputOmegaY = document.getElementById("omegaY");
let inputTheta = document.getElementById("theta");
let displayOmegaXvalue = document.getElementById("displayOmegaX");
let displayOmegaYvalue = document.getElementById("displayOmegaY");
let displayThetavalue = document.getElementById("displayTheta");

inputOmegaX.value = omegaX;
inputOmegaY.value = omegaY;
inputTheta.value = theta;

displayOmegaXvalue.innerText = omegaX;
displayOmegaYvalue.innerText = omegaY;
displayThetavalue.innerText = theta;

inputOmegaX.addEventListener("change", () => {
    omegaX = inputOmegaX.value;
    displayOmegaXvalue.innerText = omegaX;
    cleanCanvas();
});
inputOmegaY.addEventListener("change", () => {
    omegaY = inputOmegaY.value;
    displayOmegaYvalue.innerText = omegaY;
    cleanCanvas();
});
inputTheta.addEventListener("change", () =>{
    theta = inputTheta.value;
    displayThetavalue.innerText = theta;
    cleanCanvas();
});

class Pointer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lastX = 0;
        this.lastY = 0;
        this.color = "#16f219";
    }

    updatePosition(x, y) {
        this.lastX = this.x;
        this.lastY = this.y;

        this.x = x;
        this.y = y;
    }
};

function fixDPI(canvas, ctx) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function draw(){
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "navy";
    ctx.beginPath();
    ctx.moveTo(pointer.lastX + width/2, pointer.lastY + height/2);
    ctx.lineTo(pointer.x + width/2, pointer.y + height/2);
    ctx.strokeStyle = pointer.color;
    ctx.stroke();
}

function animate(){
    calculatePosition();

    if (angle <= degToRad(360) * 1.1) {
        angle += 0.05 / Math.log(omegaX + omegaY);
        draw();
    }

    requestAnimationFrame(animate);
}

function calculatePosition() {
    let x = a * Math.sin(omegaX * angle + theta);
    let y = b * Math.sin(omegaY * angle);

    pointer.updatePosition(x,y);
}

function cleanCanvas(){
    angle = 0;
    calculatePosition();
    calculatePosition();
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

// x = a * sin(a + theta)
// y = b * sin(b)
let angle = 0;
let pointer = new Pointer(100,100);

calculatePosition();
fixDPI(canvas, ctx);
animate();