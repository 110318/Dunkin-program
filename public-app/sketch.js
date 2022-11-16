const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

//Imagenes
let bgRegister;
let btnEnviar = [];
let finRegister;



//SCREENS 
let screen;
//LEAD


let newLead = {
    nickname: "",
    gmail: "",
    age: "",
  };
 
let userInput;
let userData=[];
let inputNickname;
let inputAge;
let inputMail;
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

//let boton = document.querySelectorAll(".boton")
/*
boton.forEach(function(elemento,index){
    elemento.addEventListener("click",function(){

    })
})
*/


function preload(){
    bgRegister = loadImage('./imgAPP/bgRegistro.png')
    finRegister = loadImage('./imgAPP/Fin.png')
<<<<<<< HEAD
    btnEnviar = [loadImage('./imgAPP/desactivado.png'),loadImage('./imgAPP/activado.png')]
=======
    btnEnviar = [loadImage('./imgAPP/desactivado.png'),loadImage('./images/activado.png')]
>>>>>>> fac73fb53e407a4933e9fdc15104a05fd0f8812b
}
function saveUserData() {
    postData(NGROK + "/lead", newLead).then((data) => {
      console.log(data, "THE DATA");
    });
    console.log(newLead);
  }


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');

   

    screen = 0

  
    inputNickname = createInput("", "text");
    inputNickname.position(59, 450);
    inputNickname.size(500  )
    inputNickname.input(onInputNickname);
   
  
    inputMail = createInput("");
    inputMail.position(59, 578);
    inputMail.size(500  )
  
    inputMail.input(onInputMail);
    
    //inputNickname.style("display", "none");
  
  
    inputAge = createInput("");
    inputAge.position(59,744);
    inputAge.size(500  )
  
    inputAge.input(onInputAge);
    
//  inputNickname.style("display", "none");


  






saveUserDataButton = createButton();
saveUserDataButton.position(windowWidth / 2.5, windowHeight / 1.5);
saveUserDataButton.style("background-color:red");

saveUserDataButton.mousePressed(saveUserData);












}

function draw() {
    background(220);
  
    switch(screen){
      case 0:
      image(bgRegister,0,0,800,1400)
      fill("Salmon");
       textSize(16);
       textAlign(CENTER);
       text("(" + floor(mouseX) + ", " + floor(mouseY) + ")", mouseX, mouseY);
       break;
  
  
       case 1:
        image(finRegister,0,0,800,1400)
       break;
    }
  
  
  
  }


  function onInputNickname(){
    newLead.nickname = this.value();
    console.log(this.value());
  }
  
  function onInputMail(){
    newLead.gmail = this.value();
    console.log(this.value())
  }
  function onInputAge(){
    newLead.age = this.value();
    console.log(this.value());
  }




function saveUserdata(){
    
        postData(NGROK + "/lead", newLead).then((data) => {
          console.log(data, "THE DATA");
        });
        console.log(newLead);
    
}
