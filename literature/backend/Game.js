const Player = require('./player');
const Deck = require('./deck');

function Game(io) {
  this.io = io;
  this.players = [];
  this.scoreTeam0 = 0;
  this.scoreTeam1 = 0;

  this.deck = new Deck();
}

Game.prototype.start = function start() {
  if (this.players.length === 6 || this.players.length === 8) {
    this.deck.deal(this.players);
    this.players[0].isTurn = true;
  } else {
    // show alert (not enough/too many players)
  }
}

Game.prototype.addPlayer = function addPlayer(name) {
  this.players.push(new Player(name));
  if (this.players.length === 1) {
    this.players[0].leader = true;
  }
}

Game.prototype.removePlayer = function removePlayer(name) {
  for (let i = 0; i < this.players.length; i++) {
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

Game.prototype.declare = function declare(player, map, set) {
  if (player.isTurn) {
    for (let [player, cards] of map) {
      for (let i = 0; i < cards.length; i++) {
        if (!player.hasCard(cards[i])) {
          // incorrect declare
          if (player.team === 0) {
            this.scoreTeam1++;
          } else {
            this.scoreTeam0++;
          }
          this.deleteCards(set);
          return;
        }
      }
    }
    // correct declare
    if (player.team === 0) {
      this.scoreTeam0++;
    } else {
      this.scoreTeam1++;
    }
    this.deleteCards(set);
  }
}

Game.prototype.deleteCards = function deleteCards(set) {
  let setArray = Deck.getSet(set);
  for (let i = 0; i < setArray.length; i++) {
    for (let j = 0; j < this.players.length; j++) {
      if (this.players[j].hasCard(setArray[i])) {
        this.players[j].removeFromHand(setArray[i]);
        break;
      }
    }
  }
}

Game.prototype.transfer = function transfer(sourcePlayer, targetPlayer) {
  if (sourcePlayer.isTurn) {
    sourcePlayer.isTurn = false;
    targetPlayer.isTurn = true;
  }
}

module.exports = Game;