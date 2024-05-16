const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const store = '1-800-flowers';

socket.on('connect', () => {
  console.log('Flower vendor connected');
  socket.emit('driver-ready');
  socket.emit('getAll', { clientId: store, event: 'delivered' });
});

socket.on('delivered', (payload) => {
  console.log('Flower vendor received delivery notification', payload);
  if (payload.customerName) {
    console.log(`Thank you for your order, ${payload.customerName}`);
  } else {
    console.error('Invalid payload structure:', payload);
  }
});

function emitPickup(order) {
  console.log('Flower vendor emitting pickup', order);
  socket.emit('ready-for-pickup', order);
}

module.exports = { emitPickup };
