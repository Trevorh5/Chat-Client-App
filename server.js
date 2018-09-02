const net = require('net');
const fs = require('fs');

const chatLog = __dirname + '/chat.log';

let clients = [];
let index = 0;
let server = net.createServer( client => {
    index++;
    let clientName = index;
    client.write('Welcome to the server\n');
    clients.push(client);
    clients.forEach(client =>{
        client.write(`Guest${clientName} has joined`);
    });
    fs.appendFile(chatLog,`Guest${clientName} has joined\n`, (err) =>{
        if (err) throw err
    });
    client.on('data', data => {
        for(let i = 0; i < clients.length; i++){
            if(client !== clients[i]){
                clients[i].write(`Guest${clientName}: ${data.toString()}`);

            }
        }
        fs.appendFile(chatLog, `Guest${clientName}: ${data.toString()}\n`, (err) =>{
            if (err) throw err
        })

    });

    client.on('close', () => {
        let message;
        clients.forEach(dude => {
            if(dude !== client){
                message = `Guest${clientName} has left the chat`;
                dude.write(message)
            }
        });
        fs.appendFile(chatLog, message, (err) => {
            if(err) throw err
        })
    });


}).listen(5000);






console.log('listening on port 5000');