const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const cookie = require('cookie');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');
const Game = require('./Game.js');
require('dotenv').config();
// app
const app = express();
mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());

const sessionMiddleware = session({
  secret: process.env.SECRET_KEY,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 8,
  },
});

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIO(server);

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
});

app.use(sessionMiddleware);

let games = [];

io.on('connection', (socket) => {
  let connectionPlayer = null;
  let connectionGame = null;

  socket.on('join', ({ name, code }, callback) => {
    let codeFound = false;
    console.log(code);
    for (let i = 0; i < games.length; i++) {
      if (games[i].code === code) {
        codeFound = true;
        connectionGame = games[i];

        // add player to game
        const { error, player } = games[i].addPlayer(socket.id, name);
        if (player) connectionPlayer = player;

        if (error) return callback({ error: error });
        socket.join(code);
        io.to(code).emit('gameData', {
          game: connectionGame,
        });
        callback({ player: connectionPlayer.name });
      }
    }
    if (!codeFound) {
      return callback({ error: 'The game code does not exist' });
    }
  });

  socket.on('create', ({ name, code }, callback) => {
    for (let i = 0; i < games.length; i++) {
      if (games[i].code === code) {
        return callback({ error: 'The game code already exists' });
      }
    }

    // create game
    let game = new Game(code);
    connectionGame = game;

    const { player } = game.addPlayer(socket.id, name);
    connectionPlayer = player;
    games.push(game);

    socket.join(code);
    io.to(code).emit('gameData', {
      game: connectionGame,
    });
    callback({ player: connectionPlayer.name });
  });

  socket.on('assignTeam', ({ player, team }, callback) => {
    let assignedPlayer = null;
    for (let i = 0; i < connectionGame.players.length; i++) {
      if (connectionGame.players[i].name === player.name) {
        assignedPlayer = connectionGame.players[i];
      }
    }

    if (team === 'teamOne') {
      assignedPlayer.team = 1;
    } else if (team === 'teamTwo') {
      assignedPlayer.team = 2;
    } else if (team === 'unassigned') {
      assignedPlayer.team = null;
    }

    io.to(connectionGame.code).emit('gameData', {
      game: connectionGame,
    });
  });

  socket.on('start', () => {
    connectionGame.start();
    console.log(connectionGame.players);
    io.to(connectionGame.code).emit('gameData', {
      game: connectionGame,
    });
  });

  socket.on('disconnect', () => {
    if (connectionGame != null) {
      if (connectionGame.started) {
        connectionPlayer.connected = false;
        console.log(connectionPlayer.name + ' disconnected');
      } else {
        connectionGame.removePlayer(connectionPlayer.name);
        io.to(connectionGame.code).emit('gameData', {
          game: connectionGame,
        });

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
