const { emitPickup } = require('./handler');

const store = '1-206-flowers';

setInterval(() => {
  const order = {
    store,
    orderId: '1234',
    customerName: 'John Doe',
    address: '123 Main St'
  };
  emitPickup(order);
}, 2000);


