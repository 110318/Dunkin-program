//Siempre tener en cuenta
const inputs = document.querySelector(".inputs");
hideImg = document.querySelector(".show-btn");
resetBtn = document.querySelector(".reset-btn");
hint = document.querySelector(".hint span");
guessTry = document.querySelector(".guess-tries span");
typingInput = document.querySelector(".typing-input");
wrong = document.querySelector(".guess-loses span");
advertising = document.querySelectorAll(".marketing")

const flavorList = [
  {
    flavor: "hazelnut",
    hint: "It is a nut that squirrels like very much",
  },
  {
    flavor: "lemon",
    hint: "Green acid fruit",
  },
  {
    flavor: "coco",
    hint: "A delicious brown fruit from island",
  },
 
];
const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, { path: "/real-time" });
console.log("Server IP: ", NGROK);

let controllerX,
  controllerY = 0;
let posX,
  posY = 0;
let deviceWidth,
  deviceHeight = 0;
let mupiWidth,
  mupiHeight = 0;
let ballSize = 20;
let word,
  corrects = [],
  incorrectWords = [],
  maxTries;
let screen = 0
let img;

function setup() {
  frameRate(60);
  canvas = createCanvas(windowWidth, windowHeight);

  canvas.style("z-index", "-1");
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("right", "0");
  posX = windowWidth / 2;
  posY = windowHeight / 2;
  controllerX = windowWidth / 2;
  controllerY = windowHeight / 2;
  mupiWidth = windowWidth;
  mupiHeight = windowHeight;
  background(0);

let key;

  // Leyendo la letra que viene de la app - Si es la primera vez, inicia el juego, socket.on recibe una dirección y un calback
  socket.on("showchar", (char) => {
    if (char["char"] === true) displayScreen();
    else key = char["char"].toLowerCase();

    //LLamando a la función start game y le pasamos la letra que viene de la app
    startGame(key);
  });
  
  if(screen == 1){
    randomWord()
  }
}

function draw() {
  background(255, 203, 181);
  newCursor(pmouseX, pmouseY);
  fill(255);
  textSize(32);
  text("arbol", posX, posY);

  console.log(screen)

  ellipse(controllerX, controllerY, ballSize, ballSize);
}

//Estamos llamando los atributos de la imagen
function displayScreen(){
  mupiMarketing = document.querySelector("#imgMarketing");
  mupiMarketing.style.display = "none";
}

function preload(){
  img = loadImage('img/MUPI MARKETING.png')
}

function randomWord() {
  // Esto nos ayudara a obtener el sabor de dona de la lista de donas
  let ranObj = flavorList[Math.floor(Math.random() * flavorList.length)];
  word = ranObj.flavor; // obtiene el sabor de la dona
  maxTries = 8;

  // Pistas sobre los sabores de Dona
  hint.innerText = ranObj.hint;
  guessTry.innerText = maxTries;
  // wrong.innerText = "";

  //esta funcion agrega las letras al input
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += ` <input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}
randomWord();

function startGame(key) {
  // Target devuelve un elemento DOM que podemos recuperar sus atributos
  // En este caso el valor de la tecla del teclado

  //.match Se usa para obtener todas las ocurrencias.
  // En este caso vamos a usarlo para solo manejar letras, ningun otro simbolo de computador EJ: {}
 //le impide a las letras incorrectas que se repitan

  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectWords.includes(`${key}`) &&
    !corrects.includes(key)
  ) {
    console.log(key);
    // Se validan las palabras y las teclas correctas
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          // Por medio del query selectorAlll devuelve elementos del css que coincide con las palabras seleccionadas en el teclado.
          // Ayuda para obtener coincidencias
          corrects.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
      //Esto lo que hara es revisar si una de las letras corresponde con el sabor.
      console.log("letter found");
    } else {
      //vamos minimizando los intentos
      maxTries--;
      incorrectWords.push(`${key}`);
    }
    //muestra el numero de intentos
    guessTry.innerText = maxTries;
    //  wrong.innerText = incorrectWords;
  }

  // Esta variable permite escribir sin necesidad de presionar el input.
  typingInput.value = "";

  setTimeout(()=>{
    
    if (corrects.length === word.length) {
      socket.emit('has_won', true);
      alert("Congratulations! you won a coupon, please register and we send you to the email a surprise");
      window.location.reload(true);
    }else if (maxTries < 0) {
      socket.emit('has_won', false);
      alert("gameover");
      window.location.reload(true)
       for (let i = 0; i < word.length; i++) {
        //Este if nos permite alertarle al usuario que sus intentos ya pasaron.
        //muestra el sabor que era correcto
        inputs.querySelectorAll("input")[i].value = word[i];
       }
    }
  },500);
}

// boton para resetear sabores
//resetBtn.addEventListener("click", randomWord);
//permite el uso del teclado para mandar respuesta al input


// typingInput.addEventListener("input", startGame);
// document.addEventListener("keydown", () => typingInput.focus());

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
  noStroke();
  fill(255, 0, 0);
  ellipse(x, y, 10, 10);
}

function mousePressed(){
  if(screen ==0){
    screen = 1
  }
}