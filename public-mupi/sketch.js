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
    flavor: "chocolate",
    hint: "Mix between Cacao and Milk",
  },
  {
    flavor: "chantilly",
    hint: "A delicious white cream",
  },
  {
    flavor: "arequipe",
    hint: "Liquid color caramel",
  },
  {
    flavor: "coco",
    hint: "Brown fruit from island",
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

  // Leyendo la letra que viene de la app
  socket.on("showchar", (char) => {
    key = char["char"].toLowerCase();
    console.log(key);

    //LLamando a la función start game y le pasamos la letra que viene de la app
    startGame(key);
  });
}

function draw() {
  background(255, 203, 181);
  newCursor(pmouseX, pmouseY);
  fill(255);
  textSize(32);
  text("arbol", posX, posY);

  ellipse(controllerX, controllerY, ballSize, ballSize);
}

function randomWord() {
  // Esto nos ayudara a obtener el sabor de dona de la lista de donas
  let ranObj = flavorList[Math.floor(Math.random() * flavorList.length)];
  word = ranObj.flavor; // obtiene el sabor de la dona
  maxTries = 8;
  console.log(ranObj);

  // Pistas sobre los sabores de Dona
  hint.innerText = ranObj.hint;
  guessTry.innerText = maxTries;
  // wrong.innerText = "";

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += ` <input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}
randomWord();

function showMerch() {}

function startGame(key) {
  // Target devuelve un elemento DOM que podemos recuperar sus atributos
  // En este caso el valor de la tecla del teclado

  //.match Se usa para obtener todas las ocurrencias.
  // En este caso vamos a usarlo para solo manejar letras, ningun otro simbolo de computador EJ: {}
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectWords.includes(`${key}`) &&
    !corrects.includes(key)
  ) {
    console.log(key);

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

  if (maxTries < 1) {
    alert("gameover");
  }
}

// boton para resetear sabores
resetBtn.addEventListener("click", randomWord);
//permite el uso del teclado para mandar respuesta al input

// typingInput.addEventListener("input", startGame);
// document.addEventListener("keydown", () => typingInput.focus());

function mouseDragged() {
  socket.emit("positions", { controlX: pmouseX, controlY: pmouseY });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
  noStroke();
  fill(255, 0, 0);
  ellipse(x, y, 10, 10);
}
