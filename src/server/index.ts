/**
 * This file implements the main file of the server, using net module to create a TCP server.
 */
import net from 'net';
import {PORT} from "./consts.js";
import {handleRequest} from "./fileManager/requestHandler.js";

const server = net.createServer((socket) => {
  console.log('Client connected');

  let accumulatedData = '';
  socket.on('data', (data) => {
    accumulatedData += data.toString();
    if (accumulatedData.endsWith('\f')) {
      const request = JSON.parse(accumulatedData.slice(0, -1));

      // Emit a 'request' event
      socket.emit('request', request);

      accumulatedData = '';
    }
  });

  // Get the 'request' event
  socket.on('request', (request) => {
    // Call the request handler
    handleRequest(request, socket);
  });

  // Caution
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log('Server started on port', PORT);
});