const { placeBid, activeAuctions, highestBids } = require('.');
const Chance = require('chance');
const lorem = new Chance();

setInterval(() => {
  if (Object.keys(activeAuctions).length > 0) {
    const item = Object.values(activeAuctions)[Math.floor(Math.random() * Object.values(activeAuctions).length)];
    const bidAmount = `$${lorem.integer({ min: Number(highestBids[item].substring(1)), max: (2 * Number(highestBids[item].substring(1)))})}`;
    placeBid(bidAmount, item);
  }
}, 5000);
