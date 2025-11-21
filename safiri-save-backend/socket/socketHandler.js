/**
 * Socket.io Handler
 */

const userSocketMap = new Map();

export const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket Client Connected: ${socket.id}`);

    // Future: Listen for 'authenticate' event to map user ID to socket ID
    // socket.on('authenticate', (userId) => { ... });

    socket.on('disconnect', () => {
      console.log(`Socket Client Disconnected: ${socket.id}`);
    });
  });
};