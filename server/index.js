'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
console.log('Listening on port:', PORT);
const io = require('socket.io')(PORT);

io.on('connection', handleClientConnection);

const activeAuctions = {};

function handleClientConnection(socket) {
  console.log('New Connection:', socket.id);

  socket.on('auction-create', (payload) => {
    activeAuctions[payload.auctionId] = payload;
    console.log('Auction created for item:', payload.item);
    io.emit('bidding-in-process', payload);

    setTimeout(() => {
      console.log(`Auction for "${payload.item}" has ended`);
      io.emit('auction-over', activeAuctions[payload.auctionId]);
      delete activeAuctions[payload.auctionId];
    }, 25000);
  });

  socket.on('place-bid', (payload) => {
    console.log('New bid received for ', activeAuctions[payload.auctionId].item);
    const highestBid = Number(activeAuctions[payload.auctionId].highestBid.substring(1));
    const bid = Number(payload.amount.substring(1));
    if (bid > highestBid) {
      console.log(`New highest bid for "${activeAuctions[payload.auctionId].item}": ${payload.amount}`);
      activeAuctions[payload.auctionId].highestBid = payload.amount;
      io.emit('bid-placed', activeAuctions[payload.auctionId]);
    }
  });
}
