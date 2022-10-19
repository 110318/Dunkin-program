const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });


let userInput;
let userData=[];
let inputNickname;
let saveUserDataButton;
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    return data;
  };
let isTouched = false
let newLead = {
    nickname: "",
    gmail: "",
    age: "",
  };
//let boton = document.querySelectorAll(".boton")
/*
boton.forEach(function(elemento,index){
    elemento.addEventListener("click",function(){

    })
})
*/
function saveUserData() {
    postData(NGROK + "/lead", newLead).then((data) => {
      console.log(data, "THE DATA");
    });
    console.log(newLead);
  }

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

  inputNickname = createInput("", "text");
  inputNickname.position((windowWidth / 2)-80, windowHeight / 2);
  inputNickname.input(onInputNickname);
  inputNickname.style("display", "none");

  saveUserDataButton = createButton();
  saveUserDataButton.position(windowWidth / 2.5, windowHeight / 1.5);

  saveUserDataButton.mousePressed(saveUserData);
 






    socket.emit('char', {char: true});
    console.log(socket)

    socket.on('has_won', (value) => {
        console.log("hey! esta es mi value",value)
        userInput.hide();
        inputNickname.style("display", "block");
        displayScreens();
    });
}

function displayScreens(){
    appWrapper = document.querySelector('#seccion-uno');
    appWrapper.style.display = "none"

    appInterface = document.querySelector('#interfazApp')
    appInterface.style.display = "block"
    
 
}

function onInputNickname(){
    newLead.nickname = this.value();
    console.log(this.value());
}

// Coge el valor que viene de la integración
//This.value es el valor
function myInputEvent() {
    char = this.value()
    console.log(char);

//Espera los segundos del time out y limpia para que quede limpio
    setTimeout(() => {
        userInput.value('');
    }, 200);

//Envia el sistema char y dice que el valor esta en char y lo muestra por consola para ver que esta haciendo
//Char es el nombre del evento que se esta transmitiendo
//Clave y valor del diccionario y adentro esta lo que se escribe con el celular
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

function saveUserdata(){
    
}
