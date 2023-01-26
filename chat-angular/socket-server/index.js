let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');

let io = socketIO(server);
app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
        console.log("joined-room:", data)
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', { user: data.user, message: data.message });
        console.log("Message-info:", data)
    });

});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
