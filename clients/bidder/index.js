const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

socket.on('connect', () => {
  console.log('Driver connected');
  requestNextOrder();
});

socket.on('pickup', (payload) => {
  console.log('Driver received pickup notification', payload);
  if (payload.orderId) {
    console.log('Driver: picking up', payload.orderId);

    setTimeout(() => {
      console.log('Driver: in-transit', payload.orderId);
      socket.emit('package-in-transit', payload);
    }, 1000);

    setTimeout(() => {
      console.log('Driver: delivered', payload.orderId);
      socket.emit('package-delivered', payload);
      requestNextOrder(); // Request next order after delivering
    }, 3000);
  } else {
    console.error('Invalid payload structure:', payload);
  }
});

function requestNextOrder() {
  console.log('Driver: requesting next order');
  socket.emit('driver-ready');
}

module.exports = socket;
