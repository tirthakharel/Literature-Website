function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.set = this.getSet();
}

Card.prototype.getSet = function getSet() {

  const low = ['2', '3', '4', '5', '6', '7'];
  const high = ['9', '10', 'Jack', 'Queen', 'King', 'Ace'];

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
  return this.suit === 'Joker'
    ? this.rank + ' ' + this.suit
    : this.rank + ' of ' + this.suit;
};

Card.prototype.equals = function equals(card) {
  return this.rank === card.rank && this.suit === card.suit;
};

module.exports = Card;
