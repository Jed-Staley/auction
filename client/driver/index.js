const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

socket.on('pickup', (payload) => {
  console.log('Driver: picking up', payload.orderId);
  setTimeout(() => {
    console.log('Driver: in-transit', payload.orderId);
    socket.emit('in-transit', payload);
  }, 3000);

  setTimeout(() => {
    console.log('Driver: delivered', payload.orderId);
    socket.emit('delivered', payload);
  }, 4000);
});

module.export= {};

