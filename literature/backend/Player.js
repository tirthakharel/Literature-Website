const Deck = require('./Deck.js');

function Player(id, name) {
  this.hand = [];
  this.name = name;
  this.id = id;
  this.team = null;
  this.leader = false;
  this.isTurn = false;
}

Player.prototype.addToHand = function addToHand(card) {
  this.hand.push(card);
};

Player.prototype.removeFromHand = function removeFromHand(card) {
  for (let i = 0; i < this.hand; i++) {
    if (this.hand[i].equals(card)) {
      this.hand.splice(i, 1);
    }
  }
};

Player.prototype.hasCard = function hasCard(card) {
  for (let i = 0; i < this.hand; i++) {
    if (this.hand[i].equals(card)) {
      return true;
    }
  }
  return false;
};

Player.prototype.getSets = function getSets() {
  let Sets = new Set();
  this.hand.forEach((card) => {
    Sets.add(card.set);
  });

  return Sets;
};

Player.prototype.availableCards = function availableCards(stringSet) {
  const set = Deck.getSet(stringSet);
  let arr = [];

  set.forEach((card) => {
    let index = this.hand.findIndex((element) => {
      return card.equals(element);
    });

    if (index === -1) {
      arr.push(card);
    }
  });

  return arr;
};

module.exports = Player;
