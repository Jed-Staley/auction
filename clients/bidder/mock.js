const { placeBid, itemsForSale } = require('.');
const Chance = require('chance');
const lorem = new Chance();

setInterval(() => {
  const bidAmount = lorem.dollar();
  const item = itemsForSale[Math.floor(Math.random() * itemsForSale.length)];
  placeBid(bidAmount, item.name);
}, 20000);
