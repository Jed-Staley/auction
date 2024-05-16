const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const itemsForSale = [];

socket.on('connect', () => {
  console.log('Bidder connected');
});

socket.on('bidding-in-process', (payload) => {
  console.log(`Item has been put up for auction.\nItem: ${payload.name}`);
  itemsForSale[payload.name] = payload.id;
});

socket.on('')

function placeBid(bidAmount, itemName) {
  const bid = {
    amount: bidAmount,
    item: itemName
  }
  socket.emit('place-bid', bid);
}

module.exports = { placeBid, itemsForSale };