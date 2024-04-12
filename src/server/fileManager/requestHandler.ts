/**
 * @file requestHandler.ts
 * @description This file implements the request handler for the server.
 */

import {RequestTypes} from "../../requests/requests.js";
import net from "net";
import {
  createErrorResponse,
  createGetResponse,
  createListResponse,
  createSuccessResponse
} from "../../requests/responses.js";
import {listCollection} from "./listCollection.js";
import {ICard} from "../../types/ICard.js";
import {showCard} from "./showCard.js";

/**
 * Handle a request from the client
 * @param request The request to handle
 * @param socket The socket to send the response to
 */
export function handleRequest(request: RequestTypes, socket: net.Socket) {
  console.log('Request event:', request);

  switch (request.type) {
    case 'add': {
      console.log('Adding card:', request.card);

      // Send a response to the client
      const response = createSuccessResponse('Card added successfully');
      const responseString = JSON.stringify(response) + '\f';
      socket.write(responseString);
      socket.end();
      break;
    }
    case 'list':
      console.log('Listing cards for user:', request.user);

      listCollection(request.user, (err, data) => {
        if (err) {
          console.error("ListCollection err:", err);
          const response = createErrorResponse('Error listing cards: ' + err);
          const responseString = JSON.stringify(response) + '\f';
          socket.write(responseString);
          socket.end();
        }
        else if (data) {
          // console.log("Data:", data)

          if (data.length === 0) {
            console.log(("No cards in the collection"));
            const response = createErrorResponse('No cards in the collection');
            const responseString = JSON.stringify(response) + '\f';
            socket.write(responseString);
            socket.end();
            return;
          }

          const response = createListResponse(data as ICard[]);

          const responseString = JSON.stringify(response) + '\f';
          socket.write(responseString);
          socket.end();
        }
      });

      break;
    case 'show':
      console.log('Showing card:', request.id);
      showCard(request.user, request.id, (err, data) => {
        if (err) {
          console.error("ShowCard err:", err);
          const response = createErrorResponse('Error showing card: ' + err);
          const responseString = JSON.stringify(response) + '\f';
          socket.write(responseString);
          socket.end();
        }
        else if (data) {
          const response = createGetResponse(data as ICard);
          const responseString = JSON.stringify(response) + '\f';
          socket.write(responseString);
          socket.end();
        }
      });
      break;
    case 'update':
      console.log('Updating card:', request.id);
      break;
    case 'remove':
      console.log('Removing card:', request.id);
      break;
    default:
      console.log('Unknown request type:');
      break;
  }
}