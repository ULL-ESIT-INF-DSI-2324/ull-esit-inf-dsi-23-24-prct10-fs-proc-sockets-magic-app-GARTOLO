import { CommandModule } from "yargs";
import chalk from "chalk";
import { baseDir } from "../magic-app.js";
import fs from "fs";
import { printCard } from "../functions/printCard.js";

/**
 * Command module to show a card in the collection
 */
export const showCommand: CommandModule = {
  command: "show",
  describe: "Show a card in the collection",
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
  },
  handler: (argv) => {
    console.log(
      chalk.blue("Show card with ID: " + argv.id + " for user: " + argv.user),
    );

    // TODO: Get the card from server

    // printCard(card);
  },
};
