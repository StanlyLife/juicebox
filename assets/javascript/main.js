/* global variables */
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const main = document.querySelector("main");

/* to create a deck, call GetDeck(jsonurl, category) */
async function fetchCards(json, category) {
  let x;
  await fetch(json)
    .then((questions) => questions.json())
    .then((q) => {
      x = CreateDeck(q, category);
    });
  return x;
}
/* Create and shuffle deck */
function CreateDeck(questions, category) {
  let questionList = [];
  let i = 1;
  /* create array */
  for (var key in questions) {
    questionList.push(questions[key].question);
    i++;
  }

  /* shuffle the array */
  const shuffledArray = ShuffleDeck(questionList);

  /* add to local storage */
  return DeckToLocalStorage(shuffledArray, category);
}

/* de-facto unbiased shuffle algorithm */
function ShuffleDeck(deck) {
  var currentIndex = deck.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }

  return deck;
}
/* */

/* local storage */
function DeckToLocalStorage(deck, category) {
  const myStorage = window.localStorage;
  let jsonDeck = deck;
  if (
    myStorage[category] === undefined ||
    JSON.parse(myStorage[category]).length < 1
  ) {
    localStorage.setItem(category, JSON.stringify(jsonDeck));
    cards = jsonDeck;
  } else {
    const storageDeck = JSON.parse(localStorage.getItem(category));
    cards = storageDeck.deck;
  }
  console.log(JSON.parse(myStorage[category]).length);
  return JSON.stringify(jsonDeck);
}

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
    return item;
  }

  pop() {
    this.items.splice(this.items.indexOf(this.items.length), 1);
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    if (this.items.length < 1) {
      return true;
    }
    return false;
  }

  printStack() {
    //regular for loops are faster than for each
    console.log(`the stack has ${this.items.length} items`);
    for (let i = 0; i < this.items.length; i++) {
      console.log(this.items[i]);
    }
  }
}
let oldCards = new Stack();
