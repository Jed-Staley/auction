// const io = require('socket.io-client');
// const socket = io.connect('http://localhost:3000');

// socket.on('connect', () => {
//   socket.emit('getAll', { clientId: 'driver', event: 'pickup' });
// });

// socket.on('pickup', (payload) => {
//   console.log('Driver: picking up', payload.orderId);

//   setTimeout(() => {
//     console.log('Driver: in-transit', payload.orderId);
//     socket.emit('in-transit', payload);
//   }, 1000);

//   setTimeout(() => {
//     console.log('Driver: delivered', payload.orderId);
//     socket.emit('delivered', payload);
//   }, 3000);

//   socket.emit('received', { clientId: 'driver', event: 'pickup', messageId: payload.messageId });
// });
