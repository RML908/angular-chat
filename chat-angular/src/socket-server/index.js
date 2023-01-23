const express = require('express');
const http = require("http");
let app = express();
const httpServer = require('http').createServer(app);
let server = http.Server(app)
const io = require('socket.io')(httpServer, {
  cors: {origin: '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    console.log(data);
    socket.join(data);
    socket.broadcast.to(data).emit('user joined');
  });
  socket.on('message', (data) =>{
    console.log("sdds",message)
    console.log("dsdsd",socket);
    io.in(data.room).emit('new message', {user:data.user  , message:data.message});
  });

})
// io.on('connection', (socket) => {
//   console.log('a user connected');
//
//   socket.on('message', (message) => {
//     console.log(message);
//     io.emit('message', `${socket.id.substr(0, 2) } said ${message}`);
//   });
//   socket.on('disconnect', () => {
//     console.log('a user disconnected');
//   });
//
// });
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`)
})
// httpServer.listen(port, () => console.log(`listening on port ${port}`));
