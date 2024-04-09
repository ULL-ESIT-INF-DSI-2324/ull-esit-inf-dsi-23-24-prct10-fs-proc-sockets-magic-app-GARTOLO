/**
 * This file implements the main file of the server, using net module to create a TCP server.
 */

import net from 'net';

const server = net.createServer((socket) => {
  console.log('Client connected');

  let accumulatedData = '';
  socket.on('data', (data) => {
    accumulatedData += data.toString();
    if (accumulatedData.endsWith('\f')) {
      const request = JSON.parse(accumulatedData.slice(0, -1));

      switch (request.type) {
        case 'add':
          console.log('Adding card:', request.card);

          // Send a response to the client

          const response = {
            type: 'add',
            success: true,
          };
          const responseString = JSON.stringify(response) + '\f';
          socket.write(responseString);
          socket.end();
          break;
        case 'list':
          console.log('Listing cards for user:', request.user);
          break;
        case 'show':
          console.log('Showing card:', request.id);
          break;
        case 'update':
          console.log('Updating card:', request.id);
          break;
        case 'remove':
          console.log('Removing card:', request.id);
          break;
        default:
          console.log('Unknown request type:', request.type);
      }

      accumulatedData = '';
    }
  });

  // Caution
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(8000, () => {
  console.log('Server started on port 8000');
});