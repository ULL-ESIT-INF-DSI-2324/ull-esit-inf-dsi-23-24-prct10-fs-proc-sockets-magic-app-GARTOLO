import { expect } from 'chai';
import {addCard} from "../src/server/fileManager/addCard.js";
import {createICard} from "../src/client/functions/createICard.js";
import {CardColour, CardRarity, CardType} from "../src/types/ICard.js";
import {removeCard} from "../src/server/fileManager/removeCard.js";
import {updateCard} from "../src/server/fileManager/updateCard.js";
import {showCard} from "../src/server/fileManager/showCard.js";
import {listCollection} from "../src/server/fileManager/listCollection.js";
import fs from "fs";

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

  const card2 = createICard({
    id: 2,
    name: "Test Card 2",
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

  it('Add another new card', (done) => {
    addCard("test", card2, (err) => {
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

  it('Remove another card', (done) => {
    removeCard("test", 2, (err) => {
      expect(err).to.be.undefined;
      done();
    });
  });

  it('Update a card that does not exists', (done) => {
    updateCard("test", card2, (err) => {
      expect(err).to.equal("Error on read file. Card does not exists");
      done();
    });
  });

  it('Update a card from a user that does not exists', (done) => {
    updateCard("test2", card, (err) => {
      expect(err).to.equal("Error on read dir. User does not exists");
      done();
    });
  });

  it('Update a card', (done) => {
    updateCard("test", card, (err) => {
      expect(err).to.be.undefined;
      done();
    });
  });

  it('Show a card', (done) => {
    showCard("test", 1, (err, data) => {
      expect(err).to.be.undefined;
      expect(data).to.deep.equal(card);
      done();
    });
  });

  it('Show a card that does not exists', (done) => {
    showCard("test", 2, (err, data) => {
      expect(err).to.equal("Error on read file. Card does not exists");
      expect(data).to.be.undefined;
      done();
    });
  });

  it('Show a card from a user that does not exists', (done) => {
    showCard("test2", 1, (err, data) => {
      expect(err).to.equal("Error on read dir. User does not exists");
      expect(data).to.be.undefined;
      done();
    });
  });

  it('List collection', (done) => {
    listCollection("test", (err, data) => {
      expect(err).to.be.undefined;
      expect(data).to.deep.equal([card]);
      done();
    });
  });

  it('List collection from a user that does not exists', (done) => {
    listCollection("test2", (err, data) => {
      expect(err).to.equal("Error on read dir. User does not exists");
      expect(data).to.be.undefined;
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

  // Remove the user test directory
  after((done) => {
    fs.rmdir("CardsCollection/test", (err) => {
      done();
    });
  })
});