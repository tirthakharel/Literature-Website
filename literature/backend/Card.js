const { low, high } = require('../constants/constants.js');

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.set = this.getSet();
}

Card.prototype.getSet = function getSet() {
  if (this.rank == '8' || this.suit == 'Joker') {
    return 'Jokers';
  } else {
    if (low.includes(this.rank)) {
      return 'Low ' + this.suit;
    } else if (high.includes(this.rank)) {
      return 'High ' + this.suit;
    }
  }
};

module.exports = Card;
