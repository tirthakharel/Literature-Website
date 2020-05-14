const { low, high } = require('../constants/constants.js');

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.set = this.getSet();
}

Card.prototype.getSet = function getSet() {
  if (this.rank === '8' || this.suit === 'Joker') {
    return 'Jokers';
  } else {
    if (low.includes(this.rank)) {
      return 'Low ' + this.suit;
    } else if (high.includes(this.rank)) {
      return 'High ' + this.suit;
    }
  }
};

Card.prototype.toString = function toString() {
  return this.suit === 'Joker' ? this.rank + ' ' + this.suit : 
                                 this.rank + ' of ' + this.suit;
}

Card.prototype.equals = function equals(card) {
  return this.rank === card.rank && this.suit === card.suit;
}

module.exports = Card;
