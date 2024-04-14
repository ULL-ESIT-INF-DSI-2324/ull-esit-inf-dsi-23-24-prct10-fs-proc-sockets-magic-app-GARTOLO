/**
 * @file requestHandler.spec.ts
 * @description This file implements the request handler for the server.
 */

import { RequestTypes } from "../../requests/requests.js";
import net from "net";
import {
  createErrorResponse,
  createGetResponse,
  createListResponse,
  createSuccessResponse,
} from "../../requests/responses.js";
import { listCollection } from "./listCollection.js";
import { ICard } from "../../types/ICard.js";
import { showCard } from "./showCard.js";
import { removeCard } from "./removeCard.js";
import { addCard } from "./addCard.js";
import { updateCard } from "./updateCard.js";

/**
 * Handle a request from the client
 * @param request The request to handle
 * @param socket The socket to send the response to
 */
export function handleRequest(request: RequestTypes, socket: net.Socket) {
  console.log("Request event:", request.type);

  switch (request.type) {
    case "add": {
      console.log("Adding card.");

      addCard(request.user, request.card, (err) => {
        if (err) {
          console.error("AddCard err:", err);
          const response = createErrorResponse("Error adding card: " + err);
          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        } else {
          const response = createSuccessResponse("Card added successfully");
          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        }
      });
      break;
    }
    case "list":
      console.log("Listing cards for user:", request.user);

      listCollection(request.user, (err, data) => {
        if (err) {
          console.error("ListCollection err:", err);
          const response = createErrorResponse("Error listing cards: " + err);
          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        } else if (data) {
          // console.log("Data:", data)

          if (data.length === 0) {
            console.log("No cards in the collection");
            const response = createErrorResponse("No cards in the collection");
            const responseString = JSON.stringify(response) + "\f";
            socket.write(responseString);
            socket.end();
            return;
          }

          const response = createListResponse(data as ICard[]);

          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        }
      });

      break;
    case "show":
      console.log("Showing card:", request.id);
      showCard(request.user, request.id, (err, data) => {
        if (err) {
          console.error("ShowCard err:", err);
          const response = createErrorResponse("Error showing card: " + err);
          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        } else if (data) {
          const response = createGetResponse(data as ICard);
          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        }
      });
      break;
    case "update":
      console.log("Updating card:", request.id);

      updateCard(request.user, request.card, (err) => {
        if (err) {
          console.error("UpdateCard err:", err);
          const response = createErrorResponse("Error updating card: " + err);
          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        } else {
          const response = createSuccessResponse("Card updated successfully");
          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        }
      });
      break;
    case "remove":
      console.log("Removing card:", request.id);
      removeCard(request.user, request.id, (err, data) => {
        if (err) {
          console.error("RemoveCard err:", err);
          const response = createErrorResponse("Error removing card: " + err);
          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        } else if (data) {
          const response = createSuccessResponse("Card removed successfully");
          const responseString = JSON.stringify(response) + "\f";
          socket.write(responseString);
          socket.end();
        }
      });
      break;
    default:
      console.log("Unknown request type:");
      break;
  }
}
