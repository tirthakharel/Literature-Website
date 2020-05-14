const constants = require('../constants/constants');

function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.set = this.getSet();
}

Card.prototype.getSet = function getSet() {
  console.log(constants);
  if (this.rank === '8' || this.suit === 'Joker') {
    return 'Jokers';
  } else {
    if (constants.low.includes(this.rank)) {
      return 'Low ' + this.suit;
    } else if (constants.high.includes(this.rank)) {
      return 'High ' + this.suit;
    }
  }
};

Card.prototype.toString = function toString() {
  return this.suit === 'Joker'
    ? this.rank + ' ' + this.suit
    : this.rank + ' of ' + this.suit;
};

Card.prototype.equals = function equals(card) {
  return this.rank === card.rank && this.suit === card.suit;
};

module.exports = Card;
