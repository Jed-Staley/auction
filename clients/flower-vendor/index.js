const { emitPickup } = require('./handler');

const store = '1-800-flowers';

setInterval(() => {
  const order = {
    store,
    orderId: '1234',
    customerName: 'John Doe',
    address: '123 Main St'
  };
  emitPickup(order);
}, 3000);
