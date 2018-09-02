const net = require('net');

let socket = net.createConnection({port: 5000} , () => {
    console.log('connected');
});
socket.setEncoding('utf8');

process.stdin.pipe(socket);

socket.on('data', data => {
    console.log(data);
});