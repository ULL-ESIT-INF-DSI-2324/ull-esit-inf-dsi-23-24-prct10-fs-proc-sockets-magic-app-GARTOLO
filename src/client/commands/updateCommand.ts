import { CommandModule } from "yargs";
import { ICard } from "../../ICard.js";
import chalk from "chalk";
import { createICard } from "../functions/createICard.js";

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
  },
};
