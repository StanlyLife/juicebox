let oldCards = new Stack();

async function StartFetch() {
  const cards = await fetchCards("./json/Juice.json", "deep").then((x) =>
    JSON.parse(x)
  );
  return cards;
}

async function Start() {
  const cards = await StartFetch();
  NextCard();
}

function addToStack() {
  const currentCard = document.querySelector(".question");
  if (currentCard !== null) {
    console.log(
      `added "${oldCards.push(currentCard.firstChild.innerText)}" to stack`
    );
  }
}

function ShiftLocalStorage(question) {
  let localStorageDeck = JSON.parse(window.localStorage["deep"]);
  localStorageDeck.splice(0, 1);
  window.localStorage.setItem("deep", JSON.stringify(localStorageDeck));
}

function AddToLocalStorage(question) {
  let localStorageDeck = JSON.parse(window.localStorage["deep"]);
  localStorageDeck.unshift(question);
  window.localStorage.setItem("deep", JSON.stringify(localStorageDeck));
}

/* event listeners */
next.addEventListener("click", NextCard);
previous.addEventListener("click", PreviousCard);

function NextCard() {
  /* add card to stack */
  addToStack();
  RemoveHtmlCard("next");
  /* add card from localstorage and pop */
  const question = JSON.parse(window.localStorage["deep"]);
  if (question.length > 0) {
    CreateHtmlCard(question[0], "nextIn");
    ShiftLocalStorage(question[0]);
  } else {
    console.log("no more questions");
    //TODO
    //Create do you want to play again or back to home (card)
  }
}

function PreviousCard() {
  const previous = oldCards.peek();
  if (previous !== undefined) {
    /* add card to localstorage top */
    const currentQuestion = document.querySelector(".question").firstChild
      .innerText;
    AddToLocalStorage(currentQuestion);
    RemoveHtmlCard("previous");

    /* add card from stack */
    CreateHtmlCard(previous, "previousIn");
    /* remove card from stack */
    oldCards.pop();
  } else {
    console.log("no previous cards");
  }
}

function CreateHtmlCard(text, side) {
  //create element
  const card = document.createElement("div");
  const question = document.createElement("div");
  const questionText = document.createElement("p");
  //add classes
  card.classList.add("card");
  card.classList.add(side);

  question.classList.add("question");
  //add text
  questionText.innerText = text;
  //append children
  question.appendChild(questionText);
  card.appendChild(question);

  /* add eventlistener */
  card.addEventListener("animationend", () => card.classList.remove(side));
  //remove class after animation
  main.appendChild(card);
  return card;
}

function RemoveHtmlCard(side) {
  const cardList = document.querySelectorAll(".card");
  if (cardList.length > 0) {
    cardList.forEach((card) => {
      if (side === "next") {
        card.classList.add("nextOut");
      } else {
        card.classList.add("previousOut");
      }
      card.addEventListener("animationend", () => {
        try {
          main.removeChild(card);
        } catch (error) {
          console.log(`Error on removing card: ${error}`);
        }
      });
    });
  } else {
    //console.log("no cards to remove");
  }
}

Start();
