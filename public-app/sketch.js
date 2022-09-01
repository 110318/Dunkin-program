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
    userInput.size(200);
    userInput.input(myInputEvent);
}

// Coge el valor que viene de la integración
//This.value es el valor
function myInputEvent() {
    char = this.value()
    console.log(char);

//Espera los segundos del time out y limpia para que quede limpio
    setTimeout(() => {
        userInput.value('');
    }, 1000);

//Envia el sistema char y dice que el valor esta en char y lo muestra por consola para ver que esta haciendo
//Char es el nombre del evento que se esta transmitiendo
//Clave y valor del diccionario y adentro esta lo que se escribe con el celular
    socket.emit('char', {char: char});
    console.log(socket)

}



