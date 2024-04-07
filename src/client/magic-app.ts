import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { addCommand } from "./commands/addCommand.js";
import { updateCommand } from "./commands/updateCommand.js";
import { removeCommand } from "./commands/removeCommand.js";
import { listCommand } from "./commands/listCommand.js";
import { showCommand } from "./commands/showCommand.js";

// Configure the directory for the card collection
export const baseDir = "./CardsCollection";

yargs(hideBin(process.argv))
  .command(addCommand)
  .command(updateCommand)
  .command(removeCommand)
  .command(listCommand)
  .command(showCommand)
  .demandCommand(1, "To execute, you must provide a valid command!")
  .help().argv;
