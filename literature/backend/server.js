const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');
const Game = require('./Game.js');

// app
const app = express();
app.use(bodyParser.json());
app.use(cors());
// API

// app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIO(server);

let games = [];

io.on("connection", (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    let roomFound = false;
    for (let i = 0; i < games.length; i++) {
      if (games[i].roomName === room) {
        roomFound = true;
        // add player to game
        console.log(socket.id);
        const { error, player } = games[i].addPlayer(socket.id, name);
        if (error) return callback(error);
        //socket.join(room);
      }
    }
    if (!roomFound) {
      return callback("The game code does not exist");
    }
  });

  socket.on('create', ({ name, room }, callback) => {
    for (let i = 0; i < games.length; i++) {
      if (games[i].roomName === room) {
        return callback("The game code already exists")
      }
    }
    // create game
    console.log(socket.id);
    let game = new Game(socket, room);
    game.addPlayer(socket.id, name);
    games.push(game);
    //socket.join(room);
  });

  socket.on('disconnect', () => {
    console.log("disconnect");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {
  http,
  io,
  app,
};
