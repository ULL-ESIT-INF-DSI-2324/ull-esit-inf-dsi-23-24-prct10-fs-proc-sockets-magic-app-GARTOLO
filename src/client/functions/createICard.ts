import {CardColour, CardRarity, CardType, ICard, ICreatureCard, IPlaneswalkerCard} from "../../types/ICard.js";

function createICard(cardData: Partial<ICard>): ICard {
  if (!cardData.id) {
    throw new Error("Card ID is required");
  }
  if (!cardData.name) {
    throw new Error("Card name is required");
  }
  if (!cardData.manaCost) {
    throw new Error("Mana cost is required");
  }
  if (!cardData.colour) {
    throw new Error("Card colour is required");
  }
  if (!cardData.type) {
    throw new Error("Card type is required");
  }
  if (!cardData.rarity) {
    throw new Error("Card rarity is required");
  }
  if (!cardData.text) {
    throw new Error("Card text is required");
  }
  if (!cardData.value) {
    throw new Error("Card value is required");
  }

  // Check the Colour, Rarity and Type to be a valid value
  if (!Object.values(CardColour).includes(cardData.colour as CardColour)) {
    throw new Error("Invalid card colour");
  }

  if (!Object.values(CardType).includes(cardData.type as CardType)) {
    throw new Error("Invalid card type");
  }

  if (!Object.values(CardRarity).includes(cardData.rarity as CardRarity)) {
    throw new Error("Invalid card rarity");
  }

  // Create a card object with the required properties
  const card: ICard = {
    id: cardData.id,
    name: cardData.name,
    manaCost: cardData.manaCost,
    colour: cardData.colour,
    type: cardData.type,
    rarity: cardData.rarity,
    text: cardData.text,
    value: cardData.value,
  };

  // Add optional properties based on card type
  if (cardData.type === CardType.Creature) {
    const creatureCardData = cardData as Partial<ICreatureCard>;
    if (!creatureCardData.strength || !creatureCardData.resistance) {
      throw new Error("Creature cards require strength and resistance");
    }
    // Ensure card is of type ICreatureCard before assigning strength and resistance
    const creatureCard = card as ICreatureCard;
    creatureCard.strength = creatureCardData.strength;
    creatureCard.resistance = creatureCardData.resistance;
  } else if (cardData.type === CardType.Planeswalker) {
    const planeswalkerCardData = cardData as Partial<IPlaneswalkerCard>;
    if (!planeswalkerCardData.loyalty) {
      throw new Error("Planeswalker cards require loyalty");
    }
    // Ensure card is of type IPlaneswalkerCard before assigning loyalty
    const planeswalkerCard = card as IPlaneswalkerCard;
    planeswalkerCard.loyalty = planeswalkerCardData.loyalty;
  }

  return card;
}

export function createCardFromArgs(argv: any): ICard {
  return createICard(
    {
      id: Number(argv.id),
      name: String(argv.name),
      manaCost: Number(argv.mana_cost),
      colour: argv.colour,
      type: argv.type,
      rarity: argv.rarity,
      text: argv.text,
      value: Number(argv.value),
      resistance: argv.resistance ? Number(argv.resistance) : undefined,
      strength: argv.strength ? Number(argv.strength) : undefined,
      loyalty: argv.loyalty ? Number(argv.loyalty) : undefined,
    }
  );
}