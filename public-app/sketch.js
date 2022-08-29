const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;
let posX,posY = 0
let interactions = 0;
let message = "AguacateS"
let isTouched = false;
 let c;


function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    posX = windowWidth/2;
    posY = windowHeight/2;
    background(0);
    angleMode(DEGREES);
   

    socket.emit('device-size', {windowWidth, windowHeight});

    let btn = createButton("Permitir movimiento");
	btn.mousePressed(function(){
		DeviceOrientationEvent.requestPermission(); //Necesario para manipular el device.
	});

}

function draw() {
    background(0, 5);
    newCursor(pmouseX, pmouseY);
    fill(255);
    ellipse(controllerX, controllerY, 50, 50);
    
    c = color(255)
    if(isTouched === true){
        c = color(255,0,0)
    }
    fill(c);
    square(30, 330, 55, 20)
    square(30, 400, 55, 20)
    square(100, 330, 55, 20)
    square(100, 400, 55, 20)
    square(170, 330, 55, 20)
    square(170, 400, 55, 20)
    square(240, 330, 55, 20)
    square(240, 400, 55, 20)
    ////////Tercera fila//////////
    square(30, 470, 55, 20)
    square(100, 470, 55, 20)
    square(170, 470, 55, 20)
    square(240, 470, 55, 20)
    
}

/*function mouseDragged() {
    socket.emit('positions', { controlX: pmouseX, controlY: pmouseY });
}*/

function touchMoved() {
    switch (interactions) {
        case 0:
            socket.emit('mobile-instructions', { interactions, pmouseX, pmouseY,message });
            background(255, 0, 0);
            break;
    }
}

function touchStarted(){
    c = color(255);
    isTouched = true;
}

function touchEnded(){
    isTouched = false;
}

function deviceMoved() {
    switch (interactions) {
        case 1:
            socket.emit('mobile-instructions', { interactions, pAccelerationX, pAccelerationY, pAccelerationZ });
            background(0, 255, 255);
            break;
        case 2:
            socket.emit('mobile-instructions', { interactions, rotationX, rotationY, rotationZ });
            background(0, 255, 0);
            break;
    }
    
}

function deviceShaken() {
    //socket.emit('mobile-instructions', 'Moved!');
    //background(0, 255, 255);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    fill(255);
    ellipse(x, y, 10, 10);
}