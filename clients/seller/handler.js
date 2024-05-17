const Chance = require('chance');
const { sellItem } = require('./'); // Assuming emitPickup is exported from the current directory

const lorem = new Chance();

const itemPosting = () => {
  let startingPrice = lorem.dollar({ max: 100 });
  return {
    auctionId: lorem.guid(),
    item: lorem.sentence({ words: 3 }), // Generate a random item description
    startingPrice: startingPrice, // Generate a random starting price
    highestBid: startingPrice, // Set highest bid initially as starting price
    sellerName: lorem.name(), // Random seller name
    sellerAddress: lorem.address(), // Random seller address
  };
};

setInterval(() => {
  const item = itemPosting();
  sellItem(item);
}, 30000);


