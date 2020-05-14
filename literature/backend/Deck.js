const { suits, ranks, sets } = require('../constants/constants.js');
const { lowHearts, lowSpades, lowDiamonds, lowClubs, highClubs, highDiamonds, highSpades, highHearts, jokers} = require('../constants/constants.js');

const Card = require('./Card');

function Deck() {
    this.deck = [];

    for (let i = 0; i < suits.length; i++) {
        if (suits[i] == 'Joker') {
            this.deck.push(new Card('Red', suits[i]));
            this.deck.push(new Card('Black', suits[i]));
        } else {
            for (let j = 0; j < ranks.length; j++) {
                if (ranks[j] != 'Red' && ranks[j] != 'Black') {
                    this.deck.push(new Card(ranks[j], suits[i]));
                }
            }
        }
    }
}

Deck.prototype.shuffle = function shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
}

Deck.prototype.deal = function deal(players) {
    this.shuffle();
    let numPlayers = players.length;
    
    for (let i = 0; i < this.deck.length; i++) {
        players[i % numPlayers].addToHand(this.deck[i]);
    }
}

Deck.getSet = function getSet(set) {
    if (set === "Low Hearts") {
        return lowHearts;
    } else if (set === "Low Diamonds") {
        return lowDiamonds;
    } else if (set === "Low Spades") {
        return lowSpades;
    } else if (set === "Low Clubs") {
        return lowClubs;
    } else if (set === "High Hearts") {
        return highHearts;
    } else if (set === "High Diamonds") {
        return highDiamonds;
    } else if (set === "High Spades") {
        return highSpades;
    } else if (set === "High Clubs") {
        return highClubs;
    } else if (set === "Jokers") {
        return jokers;
    }
}


module.exports = Deck;
