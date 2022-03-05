const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname + "/public"))

var saveNome = [];
var message = [];
var save;
var id = 0;

io.on('connection', (socket)=>{
    socket.on('name', (nome)=>{
        save = 
            {
                userId: id,
                user: nome
            }                  
            saveNome.push(save);
            socket.emit('user', (id));    
            id += 1;
            io.emit('users', saveNome);          
            io.emit('name', nome);  
        }
    )

    socket.on('nameoff', (obj)=>{
        socket.on('disconnect', ()=>{
            io.emit('nameoff', obj);
            for(let i = 0; i < saveNome.length; i++){
                if(saveNome[i].userId == obj.id){
                    saveNome.splice(i, 1);
                    io.emit('users', saveNome); 
                }
            }
        })
    })

    message.forEach(msg => {
        socket.emit('message', (msg));
    })

    socket.on('message', (msg) => {
        message.push(msg);
        io.emit('message', msg);
    })
})

server.listen(3000);