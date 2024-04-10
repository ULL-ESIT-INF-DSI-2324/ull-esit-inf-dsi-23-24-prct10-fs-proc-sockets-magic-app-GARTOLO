/**
 * @enum CardColour - Enum for Magic card colours
 */
export enum CardColour {
  White = "White",
  Blue = "Blue",
  Black = "Black",
  Red = "Red",
  Green = "Green",
  Colourless = "Colourless",
  MultiColour = "MultiColour",
}

/**
 * @enum CardRarity - Enum for Magic card rarities
 */
export enum CardRarity {
  Common = "Common",
  Uncommon = "Uncommon",
  Rare = "Rare",
  Mythic = "Mythic",
}

/**
 * @enum CardType - Enum for Magic card types
 */
export enum CardType {
  Creature = "Creature",
  Planeswalker = "Planeswalker",
  Enchantment = "Enchantment",
  Instant = "Instant",
  Sorcery = "Sorcery",
  Artifact = "Artifact",
  Land = "Land",
}

/**
 * @interface ICard - Interface for Magic card
 */
export interface ICardBase {
  id: number;
  name: string;
  manaCost: number;
  colour: CardColour;
  type: CardType;
  rarity: CardRarity;
  text: string;
  value: number;
}

/**
 * @interface ICreatureCard - Interface for Magic creature card
 */
export interface ICreatureCard extends ICardBase {
  type: CardType.Creature;
  strength: number;
  resistance: number;
}

/**
 * @interface IPlaneswalkerCard - Interface for Magic planeswalker card
 */
export interface IPlaneswalkerCard extends ICardBase {
  type: CardType.Planeswalker;
  loyalty: number;
}

/**
 * @type ICard - Union type for all card types
 */
export type ICard = ICreatureCard | IPlaneswalkerCard | ICardBase;
