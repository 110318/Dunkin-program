const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });


let userInput;

let isTouched = false
//let boton = document.querySelectorAll(".boton")
/*
boton.forEach(function(elemento,index){
    elemento.addEventListener("click",function(){

    })
})
*/

let btn = createButton("No mostrar")
btn.mousePressed(function(){
    DeviceMotionEvent.requestPermission();
})

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');

    userInput = createInput('');
    userInput.position((windowWidth / 2) - 80, windowHeight - 100);
    userInput.size(200);
    userInput.input(myInputEvent);

  
}


function myInputEvent() {
    char = this.value()
    console.log(char);


    setTimeout(() => {
        userInput.value('');
    }, 2000);



    socket.emit('char', {char: char});
    console.log(socket)

}

function touchStarted(){
    isTouched = true;
}
function touchEnded(){
    isTouched = false
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}
