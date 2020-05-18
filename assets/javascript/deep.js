let oldCards = new Stack();
async function StartFetch() {
  const cards = await fetchCards("./json/Juice.json", "deep").then((x) =>
    JSON.parse(x)
  );
  return cards;
}

async function Start() {
  const cards = await StartFetch();
  CreateCard(cards);
}
Start();

function CreateCard(cards) {
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
