const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const activeAuctions = {};
const highestBids = {};
const myBids = {};

socket.on('connect', () => {
  console.log('Bidder connected');
});

socket.on('bidding-in-process', (payload) => {
  console.log(`An item has been put up for auction.\nItem: ${payload.item}\nStarting Price: ${payload.startingPrice}\nSeller Name: ${payload.sellerName}\nSeller Location: ${payload.sellerAddress}`);
  activeAuctions[payload.item] = payload.auctionId;
  highestBids[payload.auctionId] = payload.highestBid;
});

socket.on('bid-placed', (payload) => {
  console.log(`Highest bid on "${payload.item}" has increased from ${highestBids[payload.auctionId]} to ${payload.highestBid}!`);
  highestBids[payload.auctionId] = payload.highestBid;
});

socket.on('auction-over', (payload) => {
  if (myBids[payload.auctionId]) {
    const myBid = Number(myBids[payload.auctionId].substring(1));
    const highestBid = Number(payload.highestBid.substring(1));
    if (myBid === highestBid) {
      console.log(`You won the bidding for "${payload.item}"! Now pay up ♥`);
    } else {
      console.log(`You lost the bidding for "${payload.item}"...but hey, you saved ${payload.highestBid}!`);
    }
  } else {
    console.log(`The bidding for "${payload.item}" has ended.`);
  }
  delete activeAuctions[payload.item];
  delete highestBids[payload.auctionId];
  delete myBids[payload.auctionId];
});

function placeBid(bidAmount, itemId) {
  const bid = {
    amount: bidAmount,
    auctionId: itemId
  }
  myBids[itemId] = bid.amount;
  socket.emit('place-bid', bid);
}

module.exports = { placeBid, activeAuctions, highestBids };