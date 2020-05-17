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

  let connectionPlayer = null;
  let connectionGame = null;

  socket.on('join', ({ name, room }, callback) => {
    let roomFound = false;
    for (let i = 0; i < games.length; i++) {
      if (games[i].code === room) {
        roomFound = true;
        connectionGame = games[i];

        // add player to game
        const { error, player } = games[i].addPlayer(socket.id, name);
        if (player) connectionPlayer = player;

        if (error) return callback(error);
        socket.join(room);
        io.to(room).emit('gameData', { code: connectionGame.room, players: connectionGame.players });
        callback();
      }
    }
    if (!roomFound) {
      return callback("The game code does not exist");
    }
  });

  socket.on('create', ({ name, room }, callback) => {
    for (let i = 0; i < games.length; i++) {
      if (games[i].code === room) {
        return callback("The game code already exists");
      }
    }

    // create game
    let game = new Game(socket, room);
    connectionGame = game;

    const { player } = game.addPlayer(socket.id, name);
    connectionPlayer = player;
    games.push(game);

    socket.join(room);
    io.to(room).emit('gameData', { code: connectionGame.room, players: connectionGame.players });
    callback();
  });

  socket.on('disconnect', () => {
    if (connectionGame != null) {
      if (connectionGame.started) {
        connectionPlayer.connected = false;
        console.log(connectionPlayer.name + " disconnected");
      } else {
        connectionGame.removePlayer(connectionPlayer.name);
        io.to(connectionGame.code).emit('gameData', { code: connectionGame.room, players: connectionGame.players })
       
        // remove the game if there are no players
        if (connectionGame.players.length === 0) {
          for (let i = 0; i < games.length; i++) {
            if (games[i].code === connectionGame.code) {
              games.splice(i, 1);
            }
          }
        }
      }
    }
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {
  http,
  io,
  app,
};
