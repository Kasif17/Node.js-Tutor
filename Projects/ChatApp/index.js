const express = require('express');
const http = require('http')
const path = require('path')
const {Server} = require('socket.io')

const app = express();

const server = http.createServer(app);
const PORT = 4001;

const io = new Server(server);
app.use(express.static(path.resolve('./public')))



//
io.on('connection', (socket) => {
    console.log('New user connected successfully:', socket.id);
    
    // Listen for 'user-message' event
    socket.on('user-message', (message) => {
        // Emit the received message to all connected clients
        io.emit('message', message);
    });
});

// mongoose 


app.use('/',(req,res)=>{
    return res.sendFile(path.resolve('./public/index.html'))
})

server.listen(PORT,(req,res)=>{
    return console.log(`server is running on PORT ${PORT}`);
    
})