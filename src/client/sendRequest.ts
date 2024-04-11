/**
 * This is the entry point for the client side of the application.
 * It will connect to the server and send a request cards for a user.
 */

import net from 'net';

import { RequestTypes } from "../requests/requests.js";
import chalk from "chalk";
import {handleResponse} from "./responseHandler.js";

/**
 * Function that sends a request to the server
 * @param request The request to send
 */
export function sendRequest(request: RequestTypes) {
  const socket = net.createConnection({ port: 8000 });

  // Send a request to the server, with a request event
  const requestString = JSON.stringify(request) + "\f";
  socket.write(requestString);

  // Handle the response from the server
  let accumulatedData = '';
  socket.on('data', (data) => {
    accumulatedData += data.toString();
    if (accumulatedData.endsWith('\f')) {
      const response = JSON.parse(accumulatedData.slice(0, -1));
      // Handle the response
      handleResponse(response);

      accumulatedData = '';
    }
  });

  // The connection will be closed by the server
  socket.on('end', () => {
    console.log(chalk.blue('Connection closed by the server'));
  });
}

