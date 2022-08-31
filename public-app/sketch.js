const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });


let userInput;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');

    userInput = createInput('');
    userInput.position((windowWidth / 2) - 80, windowHeight - 100);
    userInput.size(100);
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



