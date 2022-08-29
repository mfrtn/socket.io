const http = require('http');
const server = http.createServer();

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*"}
});

const Redis = require('ioredis');

const redis = new Redis();


redis.subscribe('test-channel');

redis.on('message', function(channel, message) {
  message = JSON.parse(message);

  io.emit(channel + ':' + message.event, message.data); // test-channel:UserSignedUp

  // console.log('Message Received');
  // console.log(message.data);
});


server.listen(3000, () => {
  console.log(('listening on *.3000'));
});
