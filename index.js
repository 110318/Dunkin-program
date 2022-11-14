//El mismo puerto en ngrok y el codigo
// const express carga el paquete express
//require carga modulos
const express = require('express');
const { Server } = require('socket.io');
const {SerialPort,ReadlineParser} = require('serialport');
const PORT = 5050; // No cambiar
const SERVER_IP = '192.168.20.52'; // Cambiar por la IP del computador

//const os = require('os');
//const IPaddress = os.networkInterfaces().en0[1].address;
//se llama al express y con la propiedad use convertimos la información en un json 
const app = express();
app.use(express.json());
app.use('/app', express.static('public-app'));
app.use('/mupi', express.static('public-mupi'));

//se recibe todo la información del servidor y del puerto
const httpServer = app.listen(PORT, () => {
    console.table(
        {
        'mupi display': `http://${SERVER_IP}:${PORT}/mupi`,
        'mupi app': `http://${SERVER_IP}:${PORT}/app`
        
    }
    )



    console.log(`http://${SERVER_IP}:${PORT}/app`);
    console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});


//🔩SERIAL COMMUNICATION SETUP
const protocolConfiguration = { // *New: Defining Serial configurations
    path: '/COM3', //*Change this COM# or usbmodem#####
    baudRate: 9600
};
const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());
// Run on terminal: ngrok http 5050;
//se crea el nuevo servidor
const io = new Server(httpServer, { path: '/real-time' });

parser.on('data',function(arduinoData){
    str = arduinoData.toString(); //Convert to string
    str = str.replace(/\r?\n|\r/g, ""); //remove '\r' from this String
    str = JSON.stringify(arduinoData); // Convert to JSON
    str = JSON.parse(arduinoData); //Then parse it
    console.log(str)
    io.emit("arduinoMessage",str);




})












//atributos que trae el socket.io, por ejemplo on que recibe las instrucciones del app
/* io.on('connection', socket => {
    socket.on('char', char => {
        socket.broadcast.emit('showchar', char);
    });

    socket.on('has_won', value => {
        socket.broadcast.emit('has_won', value);
    })
});

app.post(`/lead`,(req,res,next)=>{
    console.log(req.body, "REQUEST")
    console.log("post")
})
 */