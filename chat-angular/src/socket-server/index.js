let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');

let io = socketIO(server);
app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/index.html');
});
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('user joined');
  });

  socket.on('message', (data) => {
    io.in(data.room).emit('new message', {user: data.user, message: data.message});
    console.log(data)
  });

});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});



// const { readFileSync } = require('fs');
// const { createServer } = require('http');
// const { Server } = require('socket.io');
// const users = [];
//
// const httpServer = createServer((req, res) => {
//   if (req.url !== '/') {
//     res.writeHead(404);
//     res.end('Not found');
//     return;
//   }
//   // reload the file every time
//   const content = readFileSync('index.html');
//   const length = Buffer.byteLength(content);
//
//   res.writeHead(200, {
//     'Content-Type': 'text/html',
//     'Content-Length': length
//   });
//   res.end(content);
// });
//
// const io = new Server(httpServer, {
//   // Socket.IO options
// });
//
// io.on('connection', socket => {
//   console.log(`connect ${socket.id}`);
//
// // get query params from socket and add to users array
//   const { firstName, lastName } = socket.handshake.query;
//   users.push({ id: socket.id, firstName, lastName });
//
//   // emit users array to all connected clients
//   io.emit('users', users.filter((user) => user.id !== socket.id));
//
//   console.log("users",users);
//
//   socket.on('message', ( data ) => {
//     const { message, clientId } = data;
//     socket.to(clientId).emit('message', { message, clientId });
//   });
//
//   socket.on('disconnect', () => {
//     console.log('a user disconnected');
//   });
//
// });
//
// httpServer.listen(3000);
