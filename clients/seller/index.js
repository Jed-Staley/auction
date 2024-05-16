const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

// const seller = 'Auction';

let itemPosted;

socket.on('connect', () => {
  console.log('seller connected');
});

socket.on('bidding-in-process', (payload) => {
  if (payload.auctionId === itemPosted.auctionId){
    console.log('auctioned posted successfully')
  }
});

socket.on('bid-placed', (payload) => {
  if (payload.auctionId === itemPosted.auctionId){
    console.log('bid placed on your auction for ' + payload.highestBid)
  }
});

socket.on('auction-over', (payload) => {
  const minBid = Number(payload.startingPrice.substring(1))
  const highestBid = Number(payload.highestBid.substring(1))
  if (highestBid > minBid){
    console.log('item sold for ' + highestBid)
  } else{
    console.log('item not sold')
  }
});

function sellItem(item) {
  console.log('item sent to server', item);
  itemPosted = item
  socket.emit('auction-create', item);
}


module.exports = { sellItem };
