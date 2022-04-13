const express= require('express')
const app= express();
const http= require('http')
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');


const server=http.createServer(app)

const io=new Server(server);

const userSocketMap={}

function getAllConnectedUsers(nestID){
    //Map 
    return Array.from(io.sockets.adapter.rooms.get(nestID) || []).map((socketId)=>{
      return {
          socketId,
          username:userSocketMap[socketId],
      }  
    });
}

io.on('connection',(socket)=>{
    console.log('socket connected',socket.id);
    socket.on(ACTIONS.JOIN,({nestID,username})=>{
        userSocketMap[socket.id]=username;
        socket.join(nestID);
        
        const clients=getAllConnectedUsers(nestID);
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
                clients,
                username,
                socketId:socketId,
            })
        })

    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((nestID) => {
            socket.in(nestID).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
})

const PORT=process.env.PORT || 5000
server.listen(PORT,()=>console.log(`Listening on port ${PORT}`));
