const Player = require('./player');
const Deck = require('./deck');

function Game(io) {
  this.io = io;
  this.players = [];
}

Game.prototype.start = function start() {
  if (this.players.length == 6 || this.players.length == 8) {
    Deck.deal(this.players);
    this.players[1].isTurn = true;
  } else {
    // show alert (not enough/too many players)
  }
}

Game.prototype.addPlayer = function addPlayer(name) {
  players.push(new Player(name));
}

Game.prototype.removePlayer = function removePlayer(name) {
  for (var i = 0; i < this.players.length; i++) {
    if (this.players[i].name === name) {
      this.players.splice(i, 1);
    }
  }
}

Game.prototype.ask = function ask(sourcePlayer, targetPlayer, card) {
  if (sourcePlayer.isTurn) {
    if (targetPlayer.hasCard(card)) {
      targetPlayer.removeFromHand(card);
      sourcePlayer.addToHand(card);
      // log "took card"
    } else {
      sourcePlayer.isTurn = false;
      targetPlayer.isTurn = true;
      // log "asked for card"
    }
  }
}

Game.prototype.declare = function declare(player) {
  if (player.isTurn) {

  }
}