import {CommandModule} from "yargs";
import {CardColour, CardRarity, CardType, ICard} from "../../ICard.js";
import chalk from "chalk";
import {sendRequest} from "../client.js";
import {AddRequest} from "../../requests/requests.js";

/**
 * Command to add a new card to the collection
 */
export const addCommand: CommandModule = {
  command: "add",
  describe: "Add a new card to the collection",
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
      demandOption: true,
    },
    mana_cost: {
      description: "Mana cost",
      type: "number",
      demandOption: true,
    },
    colour: {
      description: "Card colour",
      type: "string",
      demandOption: true,
    },
    type: {
      description: "Card type",
      type: "string",
      demandOption: true,
    },
    rarity: {
      description: "Card rarity",
      type: "string",
      demandOption: true,
    },
    text: {
      description: "Card text",
      type: "string",
      demandOption: true,
    },
    value: {
      description: "Card value",
      type: "number",
      demandOption: true,
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
      chalk.blue("Adding card with ID: " + argv.id + " for user: " + argv.user),
    );

    // TODO: Add the card (server)
    // const card: ICard = createICard(argv);
    const card: ICard = {
      id: Number(argv.id),
      name: String(argv.name),
      manaCost: Number(argv.mana_cost),
      colour: CardColour.Blue,
      type: CardType.Artifact,
      rarity: CardRarity.Common,
      text: String(argv.text),
      value: Number(argv.value),
    }

    const request: AddRequest = {
      type: "add",
      user: String(argv.user),
      card: card,
    }

    sendRequest(request);
  },
};
