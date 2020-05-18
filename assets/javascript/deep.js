let oldCards = new Stack();
async function StartFetch() {
  const cards = await fetchCards("./json/Juice.json", "deep").then((x) =>
    JSON.parse(x)
  );
  return cards;
}

async function Start() {
  const cards = await StartFetch();
}
Start();

function RemoveTopCard() {
  /* get card */
  const item = JSON.parse(localStorage.getItem("deep"));
  /* remove card */
  const removedItem = item[0];
  /*add removed cards to stack (LIFO) */
  oldCards.push(removedItem);
  oldCards.peek();
  oldCards.printStack();
  //   console.log(removedItem);
  item.splice(0, 1);
  localStorage.setItem("deep", JSON.stringify(item));
}

/* event listeners */
previous.addEventListener("click", OldCard);
next.addEventListener("click", NewCard);

function NewCard() {
  RemoveHtmlCard();
  CreateHtmlCard();
}

function OldCard() {
  console.log("old card");
}

function RemoveHtmlCard() {
  console.log("Remove Card");
  const activeCard = document.querySelector(".card");
  if (activeCard !== null) {
    activeCard.classList.remove("animateIn");
    activeCard.addEventListener("animationend", () => {
      main.removeChild(activeCard);
    });
    activeCard.classList.add("animateOut");
  }
}

function CreateHtmlCard() {
  let question = JSON.parse(localStorage.getItem("deep"))[0];
  if (question !== undefined) {
    console.log("create card");
    /*wrapper*/
    const card = document.createElement("div");
    card.classList.add("card");
    /*children */
    const questionWrapper = document.createElement("div");
    questionWrapper.classList.add("question");
    const questionP = document.createElement("p");
    questionP.innerText = question;
    /* append children */
    questionWrapper.appendChild(questionP);
    card.appendChild(questionWrapper);
    card.classList.add("animateIn");
    main.appendChild(card);
    RemoveTopCard();
  }
}
