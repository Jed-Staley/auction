const { emitPickup } = require('./handler');

const store = 'acme-widgets';

setInterval(() => {
  const order = {
    store,
    orderId: '5678',
    customerName: 'Jane Doe',
    address: '456 Elm St'
  };
  emitPickup(order);
}, 5000);
