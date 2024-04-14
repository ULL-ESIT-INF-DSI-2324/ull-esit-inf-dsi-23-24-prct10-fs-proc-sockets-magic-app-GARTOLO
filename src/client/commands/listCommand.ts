import { CommandModule } from "yargs";
import chalk from "chalk";
import {ListRequest} from "../../requests/requests.js";
import {sendRequest} from "../sendRequest.js";

/**
 * Command to list all cards in the collection
 */
export const listCommand: CommandModule = {
  command: "list",
  describe: "List all cards in the collection",
  builder: {
    user: {
      description: "User name",
      type: "string",
      demandOption: true,
    },
  },
  handler: (argv) => {
    console.log(chalk.blue("Listing all cards for user: " + argv.user));

    const request: ListRequest = {
      type: 'list',
      user: String(argv.user),
    };

    // Send the request to the server
    sendRequest(request);
  },
};
