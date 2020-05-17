// GetDeck("./json/Juice.json", "deep");

console.log(cards);

let myFirstPromise = new Promise((resolve, reject) => {
  var x = cards("./json/Juice.json", "deep");

  resolve(x);
  reject("Nay!");
});

myFirstPromise.then((x) => {
  console.log(cards);
});
