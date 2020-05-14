const Deck = require('../Deck.js');
const Player = require('../Player.js');
const Game = require('../Game.js');

let test = new Game('io');

test.addPlayer('p1');
test.addPlayer('p2');
test.addPlayer('p3');
test.addPlayer('p4');
test.addPlayer('p5');
test.addPlayer('p6');

test.start();

for (let i = 0; i < test.players.length; i++) {
  console.log(test.players[i].hand);
}

console.log(test.players[0].getSets());
console.log(test.players[0].hand[0].toString());
//const testDeck = new Deck();

// testDeck.shuffle();

// console.log(testDeck.deck);

//console.log('whats up');
