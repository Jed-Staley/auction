const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

let itemPosted = { auctionId: null };

socket.on('connect', () => {
  console.log('Seller connected');
});

socket.on('bidding-in-process', (payload) => {
  if (payload.auctionId === itemPosted.auctionId) {
    console.log('Auction posted successfully');
  }
});

socket.on('bid-placed', (payload) => {
  if (payload.auctionId === itemPosted.auctionId) {
    console.log('Bid placed on your auction for ' + payload.highestBid);
  }
});

socket.on('auction-over', (payload) => {
  if (payload.auctionId === itemPosted.auctionId) {
    const minBid = Number(payload.startingPrice.substring(1));
    const highestBid = Number(payload.highestBid.substring(1));
    if (highestBid > minBid) {
      console.log('Your item sold for ' + payload.highestBid);
    } else {
      console.log('Your item didn\'t sell. :(');
    }
  }
});

function sellItem(item) {
  console.log('Item sent to server', item);
  itemPosted = item;
  socket.emit('auction-create', item);
}

module.exports = { sellItem };
