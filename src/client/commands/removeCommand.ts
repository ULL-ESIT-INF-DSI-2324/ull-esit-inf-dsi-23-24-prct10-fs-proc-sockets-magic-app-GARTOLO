import { CommandModule } from "yargs";
import chalk from "chalk";
import { RemoveRequest } from "../../requests/requests.js";
import { sendRequest } from "../sendRequest.js";

/**
 * Command to remove a card from the collection
 */
export const removeCommand: CommandModule = {
  command: "remove",
  describe: "Remove a card from the collection",
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
      chalk.blue(
        "Removing card with ID: " + argv.id + " for user: " + argv.user,
      ),
    );

    // TODO: Implement the remove card (server-side)
    const request: RemoveRequest = {
      type: "remove",
      user: String(argv.user),
      id: Number(argv.id),
    };

    // Send the request to the server
    sendRequest(request);
  },
};
