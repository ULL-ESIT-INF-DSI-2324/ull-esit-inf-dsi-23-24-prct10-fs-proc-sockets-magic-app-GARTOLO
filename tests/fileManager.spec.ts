import { expect } from 'chai';
import {addCard} from "../src/server/fileManager/addCard.js";
import {createICard} from "../src/client/functions/createICard.js";
import {CardColour, CardRarity, CardType} from "../src/types/ICard.js";
import {removeCard} from "../src/server/fileManager/removeCard.js";

describe('Test fileManager and createICard', () => {
  const card = createICard({
    id: 1,
    name: "Test Card",
    manaCost: 1,
    colour: "Red" as CardColour,
    type: "Instant" as CardType,
    rarity: "Common" as CardRarity,
    text: "Test card",
    value: 1,
  });

  it('Add a new card', (done) => {
    addCard("test", card, (err) => {
      expect(err).to.be.undefined;
      done();
    });
  });

  it('Add a card that already exists', (done) => {
    addCard("test", card, (err) => {
      expect(err).to.equal("Card already exists");
      done();
    });
  });

  it('Remove a card', (done) => {
    removeCard("test", 1, (err) => {
      expect(err).to.be.undefined;
      done();
    });
  });

  it('Remove a card that does not exists', (done) => {
    removeCard("test", 1, (err) => {
      expect(err).to.equal("Error on remove file. Card does not exists");
      done();
    });
  });

  it('Remove a card from a user that does not exists', (done) => {
    removeCard("test2", 1, (err) => {
      expect(err).to.equal("Error on read dir. User does not exists");
      done();
    });
  });

});