import { CommandModule } from "yargs";
import chalk from "chalk";
import {createCardFromArgs} from "../functions/createICard.js";
import {UpdateRequest} from "../../requests/requests.js";
import {sendRequest} from "../sendRequest.js";

/**
 * Command module to update a card in the collection
 */
export const updateCommand: CommandModule = {
  command: "update",
  describe: "Update a card in the collection",
  builder: {
    user: {
      description: "User name",
      type: "string",
      demandOption: true,
    },
    id: {
      description: "Card ID",
      type: "number",
      demandOption: true,
    },
    name: {
      description: "Card name",
      type: "string",
      demandOption: false,
    },
    mana_cost: {
      description: "Mana cost",
      type: "number",
      demandOption: false,
    },
    colour: {
      description: "Card colour",
      type: "string",
      demandOption: false,
    },
    type: {
      description: "Card type",
      type: "string",
      demandOption: false,
    },
    rarity: {
      description: "Card rarity",
      type: "string",
      demandOption: false,
    },
    text: {
      description: "Card text",
      type: "string",
      demandOption: false,
    },
    value: {
      description: "Card value",
      type: "number",
      demandOption: false,
    },
    resistance: {
      description: "Card resistance",
      type: "number",
      demandOption: false,
    },
    strength: {
      description: "Card strength",
      type: "number",
      demandOption: false,
    },
    loyalty: {
      description: "Card loyalty",
      type: "number",
      demandOption: false,
    },
  },
  handler: (argv) => {
    console.log(
      chalk.blue(
        "Updating card with ID: " + argv.id + " for user: " + argv.user,
      ),
    );

    // TODO: Update the card (server-side)
    try {
      const card = createCardFromArgs(argv);

      const request: UpdateRequest = {
        type: "update",
        user: String(argv.user),
        id: Number(argv.id),
        card: card,
      };

      // Send the request to the server
      sendRequest(request);
    } catch (e) {
      console.log(chalk.bold.red("Error creating the card:", e))
    }
  },
};
