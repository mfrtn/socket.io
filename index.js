const http = require("http");
const server = http.createServer();

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" },
});

const Redis = require("ioredis");

const redis = new Redis();

const channel_prefix = "laravel_database_";
const channel_name = "test-channel";

redis.subscribe(channel_prefix + channel_name);

redis.on("message", function (channel, message) {
  message = JSON.parse(message);

  io.emit(channel + ":" + message.event, message.data);

  // console.log("Message Received");
  console.log(channel + ":" + message.event, message.data); 
});

server.listen(3000, () => {
  console.log("listening on *.3000");
});
