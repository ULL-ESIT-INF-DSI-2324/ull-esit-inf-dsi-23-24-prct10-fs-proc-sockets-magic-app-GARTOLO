import { expect } from 'chai';
import {createICard} from "../src/client/functions/createICard.js";
import {CardColour, CardRarity, CardType, ICreatureCard, IPlaneswalkerCard} from "../src/types/ICard.js";

describe('Test createICard', () => {
  it('Create a card with invalid colour', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        colour: "Invalid" as CardColour,
        type: "Instant" as CardType,
        rarity: "Common" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Invalid card colour");
  });

  it('Create a card with invalid type', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        colour: "Red" as CardColour,
        type: "Invalid" as CardType,
        rarity: "Common" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Invalid card type");
  });

  it('Create a card with invalid rarity', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        colour: "Red" as CardColour,
        type: "Instant" as CardType,
        rarity: "Invalid" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Invalid card rarity");
  });

  it('Create a creature card without strength and resistance', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        colour: "Red" as CardColour,
        type: "Creature" as CardType,
        rarity: "Common" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Creature cards require strength and resistance");
  });

  it('Create a Planeswalker card without loyalty', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        colour: "Red" as CardColour,
        type: "Planeswalker" as CardType,
        rarity: "Common" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Planeswalker cards require loyalty");
  });

  it('Create a card without id', () => {
    expect(() => {
      createICard({
        name: "Test Card",
        manaCost: 1,
        colour: "Red" as CardColour,
        type: "Instant" as CardType,
        rarity: "Common" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Card ID is required");
  });


  it('Create a card without name', () => {
    expect(() => {
      createICard({
        id: 2,
        manaCost: 1,
        colour: "Red" as CardColour,
        type: "Instant" as CardType,
        rarity: "Common" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Card name is required");
  });

  it('Create a card without mana cost', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        colour: "Red" as CardColour,
        type: "Instant" as CardType,
        rarity: "Common" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Mana cost is required");
  });

  it('Create a card without colour', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        type: "Instant" as CardType,
        rarity: "Common" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Card colour is required");
  });

  it('Create a card without type', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        colour: "Red" as CardColour,
        rarity: "Common" as CardRarity,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Card type is required");
  });

  it('Create a card without rarity', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        colour: "Red" as CardColour,
        type: "Instant" as CardType,
        text: "Test card",
        value: 1,
      });
    }).to.throw("Card rarity is required");
  });

  it('Create a card without text', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        colour: "Red" as CardColour,
        type: "Instant" as CardType,
        rarity: "Common" as CardRarity,
        value: 1,
      });
    }).to.throw("Card text is required");
  });

  it('Create a card without value', () => {
    expect(() => {
      createICard({
        id: 2,
        name: "Test Card",
        manaCost: 1,
        colour: "Red" as CardColour,
        type: "Instant" as CardType,
        rarity: "Common" as CardRarity,
        text: "Test card",
      });
    }).to.throw("Card value is required");
  });

  it("Create a creature card", () => {
    const card = createICard({
      id: 2,
      name: "Test Card",
      manaCost: 1,
      colour: "Red" as CardColour,
      type: "Creature" as CardType,
      rarity: "Common" as CardRarity,
      text: "Test card",
      value: 1,
      strength: 1,
      resistance: 1,
    } as Partial<ICreatureCard>);

    expect(card).to.deep.equal({
      id: 2,
      name: "Test Card",
      manaCost: 1,
      colour: "Red",
      type: "Creature",
      rarity: "Common",
      text: "Test card",
      value: 1,
      strength: 1,
      resistance: 1,
    });
  });

  it("Create a planeswalker card", () => {
    const card = createICard({
      id: 2,
      name: "Test Card",
      manaCost: 1,
      colour: "Red" as CardColour,
      type: "Planeswalker" as CardType,
      rarity: "Common" as CardRarity,
      text: "Test card",
      value: 1,
      loyalty: 1,
    } as Partial<IPlaneswalkerCard>);

    expect(card).to.deep.equal({
      id: 2,
      name: "Test Card",
      manaCost: 1,
      colour: "Red",
      type: "Planeswalker",
      rarity: "Common",
      text: "Test card",
      value: 1,
      loyalty: 1,
    });
  });
});