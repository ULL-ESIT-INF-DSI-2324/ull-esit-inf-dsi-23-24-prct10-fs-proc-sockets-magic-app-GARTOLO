import { ICard } from "../../types/ICard.js";
import chalk from "chalk";

/**
 * Print the card details to the console, formatted
 * @param card - The card to print
 */
export function printCard(card: ICard) {
  console.log(chalk.bold.black("====================================="));
  //TODO: Format the output
  console.log(chalk.bold("Card ID: " + card.id));
  console.log(chalk.bold("Card Name: " + card.name));
  console.log(chalk.bold("Card Mana Cost: " + card.manaCost));
  // Colour with chalk based on card colour
  process.stdout.write(chalk.bold("Card Colour: "));
  switch (card.colour) {
    case "White":
      console.log(chalk.white("White"));
      break;
    case "Blue":
      console.log(chalk.blue("Blue"));
      break;
    case "Black":
      console.log(chalk.black("Black"));
      break;
    case "Red":
      console.log(chalk.red("Red"));
      break;
    case "Green":
      console.log(chalk.green("Green"));
      break;
    case "Colourless":
      console.log(chalk.grey("Colourless"));
      break;
    case "MultiColour":
      console.log(chalk.magenta("MultiColour"));
      break;
    default:
      console.log(chalk.bold("Card Colour: " + card.colour));
  }

  console.log(chalk.bold("Card Type: " + card.type));
  console.log(chalk.bold("Card Rarity: " + card.rarity));
  console.log(chalk.bold("Card Text: " + card.text));
  console.log(chalk.bold("Card Value: " + card.value));
  if ("strength" in card)
    console.log(chalk.bold("Creature Strength: " + card.strength));
  if ("resistance" in card)
    console.log(chalk.bold("Creature Resistance: " + card.resistance));
  if ("loyalty" in card)
    console.log(chalk.bold("Planes walker Loyalty: " + card.loyalty));
  console.log(chalk.bold.black("====================================="));
}
