//Siempre tener en cuenta
//CONTROLLERS
let moveX;
let btnPress;
let joyBtn;
let activar;

let img;




//🏙️IMAGES
let imgInicio;
let imgEleccion1;
let imgEleccion2;
let imgEleccion3;
let imgActivacion;
let imgVictoria;
let imgDerrota;


function preload(){
  imgInicio = loadImage("img/Inicio.png");
  imgActivacion = loadImage("img/Activacion.png");
  imgEleccion1 = loadImage("img/Eleccion1.png");
  imgEleccion2 = loadImage("img/Eleccion2.png");
  imgEleccion3 = loadImage("img/Eleccion3.png");
  imgVictoria = loadImage("img/Victoria.png");
  imgDerrota = loadImage("img/Derrota.png");
}





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
let screen = 0;


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
  //background(0);


}


function draw() {
  
  switch (screen) {
    case 0:
      image(imgInicio,100,0,1300,750);
      if(joyBtn === 0){
        screen=1;
      }
    
      break;

    case 1:
      background(255,0,0)
      image(imgActivacion,0,0,1600,750)
      if(activar === 0){
        screen = 2
      }else{
        screen = 1;
      }
      break;

    case 2:
      image(imgEleccion1,100,0,1300,750)
      if (moveX >=0 && moveX<=2){
        screen ++;
        console.log(screen)
      }

       if(joyBtn ===0){
        image(imgDerrota,100,0,1300,750)
      }

      break;
    
      case 3:
        
        image(imgEleccion2,100,0,1300,750)
        if (moveX >=0 && moveX<=2){
          screen =4;
        }
        if(joyBtn===0){
          image(imgVictoria,100,0,1300,750)
        }
        if(moveX == 1000){
          screen =2
        }
      break;

      case 4:
        image(imgEleccion3,100,0,1300,750)
        if(moveX >=522){
          screen = 3
        }
        if(joyBtn ===0){
          image(imgDerrota,100,0,1300,750)
        }
        break;

/*
    case 3:
        if (arduinoData.posX > 900){
          screen = 4;
        }
        if (arduinoData.posX < 200 && arduinoData.posX < 400 ){
          screen = 2;
        }
        if (arduinoData.PressJostick == 1){
          image(pantallaVictoria, 100, 0, 1300, 750);
        }
        else{
          image(pantallaEleccion2, 100, 0, 1300, 750);
        }
        break;


    case 4:

      if (arduinoData.posX < 200 && arduinoData.posX < 400 ){
        screen = 3;
      }
      if (arduinoData.PressJostick == 1){
          image(pantallaDerrota, 100, 0, 1300, 750);
        }
      else{
        image(pantallaEleccion3, 100, 0, 1300, 750);
      }
    break; 
  }
*/
} 
}

  

socket.on('arduinoMessage', (str) => {

  let posX = str.PosX;
  let activate = str.Pulse;
  
  let change = str.JoystickBtn

  moveX = posX;
  joyBtn = change;    
  activar = activate;

  console.log('arduino message:',str);
  
})




