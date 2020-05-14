function Player(name) {
  this.hand = [];
  this.name = name;
  this.id = null;
  this.team = null;
  this.leader = false;
  this.isTurn = false;
}

Player.prototype.addToHand = function addToHand(card) {
  this.hand.push(card);
};

Player.prototype.removeFromHand = function removeFromHand(card) {
  let index = -1;
  for (let i = 0; i < this.hand; i++) {
    if (this.hand[i].rank === card.rank && this.hand[i].suit === card.suit) {
      index = i;
    }
  }

  if (index > -1) {
    this.hand.splice(index, 1);
  }
};

Player.prototype.hasCard = function hasCard(card) {
  for (let i = 0; i < this.hand; i++) {
    if (this.hand[i].rank === card.rank && this.hand[i].suit === card.suit) {
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

module.exports = Player;
