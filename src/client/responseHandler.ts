/**
 * @file responseHandler.ts
 * @description This file implements the response handler for the client.
 */
import chalk from "chalk";
import {
  ErrorResponse,
  GetResponse,
  ListResponse,
  ResponseTypes,
  SuccessResponse,
} from "../requests/responses.js";
import { ICard } from "../types/ICard.js";
import { printCard } from "./functions/printCard.js";

/**
 * Function that handles a response from the server
 * @param response The response to handle
 */
export function handleResponse(response: ResponseTypes) {
  // console.log('Response:', response);

  // Handle for each response object
  switch (response.type) {
    case "success": {
      const successResponse = response as SuccessResponse;
      console.log(chalk.bold.green("Success:", successResponse.message));
      break;
    }
    case "error": {
      const errorResponse = response as ErrorResponse;
      console.log(chalk.bold.red(errorResponse.message));
      break;
    }
    case "get": {
      const getResponse = response as GetResponse;
      console.log(chalk.bold.green("Success:"));
      printCard(getResponse.card);
      break;
    }
    case "list": {
      const listResponse = response as ListResponse;
      console.log(chalk.bold.green("Success:"));
      listResponse.cards.forEach((card: ICard) => {
        printCard(card);
      });
      break;
    }
    default:
      console.log(chalk.blue("Unknown response type"));
      break;
  }
}
