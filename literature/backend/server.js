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

  socket.on('reconnectUser', ({ user, game }, callback) => {
    let codeFound = false;
    let playerFound = false;

    console.log('attempting reconnect');

    for (let i = 0; i < games.length && !codeFound; i++) {
      if (games[i].code === game) {
        codeFound = true;
        connectionGame = games[i];
        console.log('code found');

        let players = games[i].players;

        for (let j = 0; j < players.length; j++) {
          if (players[j].id === user) {
            playerFound = true;
            players[j].connected = true;
            players[j].sockets.push(socket.id);
            connectionPlayer = players[j];
            console.log(connectionPlayer);

            socket.join(game);

            io.to(game).emit('gameData', {
              game: connectionGame,
            });
            callback({ game: connectionGame, player: connectionPlayer });
          }
        }
      }
    }

    if (!codeFound || !playerFound) {
      return callback({ error: 'not valid' });
    }
  });

  socket.on('join', ({ name, code }, callback) => {
    let codeFound = false;
    for (let i = 0; i < games.length; i++) {
      if (games[i].code === code) {
        codeFound = true;
        connectionGame = games[i];

        // add player to game
        const { error, player } = games[i].addPlayer(socket.id, name);
        if (player) {
          player.sockets.push(socket.id);
          connectionPlayer = player;
        }

        if (error) return callback({ error: error });
        socket.join(code);
        io.to(code).emit('gameData', {
          game: connectionGame,
        });
        callback({
          player: connectionPlayer.name,
          id: connectionPlayer.id,
          code: code,
        });
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
    player.sockets.push(socket.id);
    connectionPlayer = player;
    games.push(game);

    socket.join(code);
    io.to(code).emit('gameData', {
      game: connectionGame,
    });
    callback({
      player: connectionPlayer.name,
      id: connectionPlayer.id,
      code: code,
    });
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
    io.to(connectionGame.code).emit('gameData', {
      game: connectionGame,
    });
  });

  socket.on('ask', ({ source, target, card }, callback) => {
    let asked = connectionGame.ask(source, target, card);
    io.to(connectionGame.code).emit('gameData', {
      game: connectionGame,
    });
    callback(asked);
  });

  socket.on('transfer', ({ source, target }, callback) => {
    connectionGame.transfer(source, target);
    io.to(connectionGame.code).emit('gameData', {
      game: connectionGame,
    });
    callback();
  });

  socket.on('declare', ({ player, cards, set }, callback) => {
    let declare = connectionGame.declare(player, cards, set);
    io.to(connectionGame.code).emit('gameData', {
      game: connectionGame,
    });
    callback(declare);
  });

  socket.on('newGame', () => {
    connectionGame.started = false;
    io.to(connectionGame.code).emit('startNew', {
      game: connectionGame,
    });
  });

  socket.on('disconnect', () => {
    if (connectionGame != null) {
      connectionPlayer.sockets.splice(
        connectionPlayer.sockets.indexOf(socket.id),
        1
      );
      if (connectionPlayer.sockets.length === 0) {
        if (connectionGame.started) {
          connectionPlayer.connected = false;

          let remove = true;
          // remove the game if everyone is disconnected
          // for (let i = 0; i < connectionGame.players.length; i++) {
          //   if (connectionGame.players[i].connected === true) {
          //     remove = false;
          //   }
          // }
          // if (remove) {
          //   for (let i = 0; i < games.length; i++) {
          //     if (games[i].code === connectionGame.code) {
          //       console.log('Game removed');
          //       games.splice(i, 1);
          //     }
          //   }
          // }
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
    }
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {
  http,
  io,
  app,
};
