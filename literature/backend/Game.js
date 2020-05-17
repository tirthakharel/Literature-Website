const Player = require('./player');
const Deck = require('./deck');

function Game(io, code) {
  this.code = code;
  this.io = io;
  this.players = [];
  this.playerMap = new Map();
  this.scoreTeam0 = 0;
  this.scoreTeam1 = 0;
  this.started = false;

  this.deck = new Deck();
}

Game.prototype.start = function start() {
  if (this.players.length === 6 || this.players.length === 8) {
    this.started = true;
    this.deck.deal(this.players);
    this.players[0].isTurn = true;
  } else {
    // show alert (not enough/too many players)
  }
}

Game.prototype.addPlayer = function addPlayer(id, name) {
  for (let i = 0; i < this.players.length; i++) {
    if (this.players[i].id === id) {
      return { error: 'You have already joined this game' };
    }
    if (this.players[i].name === name) {
      if (this.players[i].connected === false) {
        this.players[i].connected = true;
        console.log(name + " reconnected");
        return {player: this.players[i]};
      }
      return { error: 'There is already a player with this name' };
    }
  }
  let player = new Player(id, name);
  this.players.push(player);
  this.playerMap.set(name, player);
  if (this.players.length === 1) {
    this.players[0].leader = true;
  }
  return {player: player};
}

Game.prototype.removePlayer = function removePlayer(name) {
  for (let i = 0; i < this.players.length; i++) {
    if (this.players[i].name === name) {
      this.players.splice(i, 1);

      // if the removed player was the leader, reassign leader
      if (this.playerMap.get(name).leader === true) {
        if (this.players.length > 0) {
          this.players[0].leader = true;
        }
      }
      this.playerMap.delete(name);
    }
  }
}

Game.prototype.ask = function ask(sourcePlayerName, targetPlayerName, card) {
  let sourcePlayer = this.playerMap.get(sourcePlayerName);
  let targetPlayer = this.playerMap.get(targetPlayerName);
  if (sourcePlayer.isTurn && sourcePlayer.hand.length > 0 && targetPlayerName.hand.length > 0) {
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

Game.prototype.declare = function declare(playerName, map, set) {
  let player = this.playerMap.get(playerName);
  if (player.isTurn && player.hand.length > 0) {
    for (let [teammate, cards] of map) {
      for (let i = 0; i < cards.length; i++) {
        if (!teammate.hasCard(cards[i])) {
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

Game.prototype.transfer = function transfer(sourcePlayerName, targetPlayerName) {
  let sourcePlayer = this.playerMap.get(sourcePlayerName);
  let targetPlayer = this.playerMap.get(targetPlayerName);
  if (sourcePlayer.isTurn) {
    sourcePlayer.isTurn = false;
    targetPlayer.isTurn = true;
  }
}

module.exports = Game;