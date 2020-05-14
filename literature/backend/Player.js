// class definition for player
function Player(name) {
  this.hand = [];
  this.name = name;
  this.id = null;
}

Player.prototype.addToHand = function addToHand(card) {
  this.hand.push(card);
};

// returns a Set
Player.prototype.getSets = function getSets() {
  let Sets = new Set();
  this.hand.forEach((card) => {
    Sets.add(card.set);
  });

  return Sets;
};

module.exports = Player;
