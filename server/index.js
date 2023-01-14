import express from "express";
import morgan from "morgan";
import { Server as Socketserver} from "socket.io";
import http from "http";
import cors from "cors";


import {SERVER} from './config.js'



const app = express();
const server = http.createServer(app);
const io = new Socketserver(server, {
    cors: {
        origin: 'https://api.render.com/deploy/srv-cf0v161a6gdm8jqauas0?key=xNuf1CFe8fw',
    }
})

app.use(cors());
app.use(morgan('dev'))

io.on('connection', (socket) => {
    console.log(socket.id)
    
    socket.on('message', function (message) {
        console.log(message)
        socket.broadcast.emit('message', {
            body: message,
            from: socket.id,
        })
    })
});



server.listen(SERVER)
console.log('server on port', SERVER)