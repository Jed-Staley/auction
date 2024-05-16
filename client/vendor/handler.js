const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

function emitPickup(payload) {
  console.log('Vendor: emitting pickup', payload);
  socket.emit('pickup', payload);
}

socket.on('delivered', (payload) => {
  console.log(`Thank you for your order, ${payload.customerName}`);
});

module.exports = {
  emitPickup,
  socket,
};
