const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const store = 'acme-widgets';

socket.on('connect', () => {
  console.log('Widget vendor connected');
  socket.emit('driver-ready');
  socket.emit('getAll', { clientId: store, event: 'delivered' });
});

socket.on('delivered', (payload) => {
  console.log('Widget vendor received delivery notification', payload);
  if (payload.customerName) {
    console.log(`Thank you for your order, ${payload.customerName}`);
  } else {
    console.error('Invalid payload structure:', payload);
  }
});

function emitPickup(order) {
  console.log('Widget vendor emitting pickup', order);
  socket.emit('ready-for-pickup', order);
}

module.exports = { emitPickup };
