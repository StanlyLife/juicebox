/* to create a deck, call GetDeck(jsonurl, category) */
let cards = async (json, category) => {
  let x;
  await fetch(json)
    .then((questions) => questions.json())
    .then((q) => {
      x = CreateDeck(q, category);
    });
  return x;
};
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
  DeckToLocalStorage(shuffledArray, category);
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
  let jsonDeck = { deck };
  if (myStorage[category] === undefined || myStorage[category] === null) {
    localStorage.setItem(category, JSON.stringify(jsonDeck));
    cards = jsonDeck;
  } else {
    const storageDeck = JSON.parse(localStorage.getItem(category));
    storageDeck.deck.forEach((x) => console.log(x));
    cards = storageDeck.deck;
  }
}
