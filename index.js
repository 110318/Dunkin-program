//El mismo puerto en ngrok y el codigo
// const express carga el paquete express
//require carga modulos
const express = require('express');
const { Server } = require('socket.io');
const PORT = 5050; // No cambiar
const SERVER_IP = '192.168.20.36'; // Cambiar por la IP del computador

//const os = require('os');
//const IPaddress = os.networkInterfaces().en0[1].address;
//se llama al express y con la propiedad use convertimos la información en un json 
const app = express();
app.use(express.json());
app.use('/app', express.static('public-app'));
app.use('/mupi', express.static('public-mupi'));

//se recibe todo la información del servidor y del puerto
const httpServer = app.listen(PORT, () => {
    console.log(`http://${SERVER_IP}:${PORT}/app`);
    console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});

// Run on terminal: ngrok http 5050;
//se crea el nuevo servidor
const io = new Server(httpServer, { path: '/real-time' });

//atributos que trae el socket.io, por ejemplo on que recibe las instrucciones del app
io.on('connection', socket => {
    console.log(socket.id);

    socket.on('char', char => {
        socket.broadcast.emit('showchar', char);
    });

});


