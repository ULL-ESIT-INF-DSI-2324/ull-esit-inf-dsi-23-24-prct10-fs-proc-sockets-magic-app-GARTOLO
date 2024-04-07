import { CardColour, CardRarity, CardType, ICard } from "../../ICard.js";

/**
 * Function to create a new ICard object with the given parameters
 * @param id Card ID
 * @param name Card name
 * @param mana_cost Mana cost
 * @param colour Card colour
 * @param type Card type
 * @param rarity Card rarity
 * @param text Card text
 * @param value Card value
 * @param strength Card strength (optional)
 * @param resistance Card resistance (optional)
 * @param loyalty Card loyalty (optional)
 * @returns ICard object
 */
export function createICard(
  id: number,
  name: string,
  mana_cost: number,
  colour: string,
  type: string,
  rarity: string,
  text: string,
  value: number,
  strength?: number,
  resistance?: number,
  loyalty?: number,
): ICard {
  // Check if the colour is valid
  if (!Object.values(CardColour).includes(colour as CardColour)) {
    throw new Error("Invalid colour");
  }

  // Check if the type is valid
  if (!Object.values(CardType).includes(type as CardType)) {
    throw new Error("Invalid type");
  }

  // Check if the rarity is valid
  if (!Object.values(CardRarity).includes(rarity as CardRarity)) {
    throw new Error("Invalid rarity");
  }

  // Check if Mana cost is a positive number
  if (mana_cost < 0) {
    throw new Error("Invalid mana cost");
  }

  let card: ICard;
  // Create the card depending on the type
  if (type === CardType.Creature) {
    card = {
      id: id,
      name: name,
      manaCost: mana_cost,
      colour: colour as CardColour,
      type: CardType.Creature,
      rarity: rarity as CardRarity,
      text: text,
      value: value,
      strength: strength,
      resistance: resistance,
    };
  } else if (type === CardType.Planeswalker) {
    card = {
      id: id,
      name: name,
      manaCost: mana_cost,
      colour: colour as CardColour,
      type: CardType.Planeswalker,
      rarity: rarity as CardRarity,
      text: text,
      value: value,
      loyalty: loyalty,
    };
  } else {
    card = {
      id: id,
      name: name,
      manaCost: mana_cost,
      colour: colour as CardColour,
      type: type as CardType,
      rarity: rarity as CardRarity,
      text: text,
      value: value,
    };
  }

  return card;
}
