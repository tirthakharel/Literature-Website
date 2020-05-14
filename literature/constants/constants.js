const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs', 'Joker'];

const ranks = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King',
  'Ace',
  'Red',
  'Black',
];

const sets = [
  'Low Hearts',
  'High Hearts',
  'Low Diamonds',
  'High Diamonds',
  'Low Spades',
  'High Spades',
  'Low Clubs',
  'High Clubs',
  'Jokers',
];

const low = ['2', '3', '4', '5', '6', '7'];

const high = ['9', '10', 'Jack', 'Queen', 'King', 'Ace'];

module.exports = {
  suits,
  ranks,
  sets,
  low,
  high,
};
