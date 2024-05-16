const io = require('socket.io')(3000);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('pickup', (payload) => {
    console.log('Event: pickup', payload);
    socket.broadcast.emit('pickup', payload);  
  });

  socket.on('in-transit', (payload) => {
    console.log('Event: in-transit', payload);
    io.emit('in-transit', payload);  
  });

  socket.on('delivered', (payload) => {
    console.log('Event: delivered', payload);
    io.emit('delivered', payload); 
  });
});
 


// Socket.on('pickup' order) => {  //I heard you
//   io.emit('pickup', order);   // Im telling everyone else
// };

// Socket.on('deliver')

// Socket.on

// hub needs to hear everything and tell everyone


// been delivered, 1 console
//thank you, other console. 

//no namespacing today or rooms

//emit for everyone and and on for everyone