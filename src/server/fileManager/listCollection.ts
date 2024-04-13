import fs from "fs";
import {ICard} from "../../types/ICard.js";
import {CARDS_DIR} from "../consts.js";

/**
 * List all cards in the collection for a user
 * @param user name of the user
 * @param callback
 */
export const listCollection = (
  user: string,
  callback: (err: string | undefined, data: ICard[] | undefined) => void,
) => {
  const userDir = `${CARDS_DIR}/${user}`;

  // Read all files in the user directory to get the cards

  fs.readdir(userDir, (err, data) => {
    if (err) {
      callback("Error on read dir. User does not exists", undefined);
    } else {
      // console.log("Data", data);

      getCards(userDir, data, (err, data) => {
        /* c8 ignore next */
        if (err) callback("Error on reading file.", undefined);
        else callback(undefined, data);
      });
    }
  });
};

/**
 * Get the cards from files data
 * @param userDir
 * @param files
 * @param callback
 */
const getCards = (
  userDir: string,
  files: string[],
  callback: (err: string | undefined, data: ICard[] | undefined) => void,
) => {
  const collection: ICard[] = [];

  files.forEach((file) => {
    fs.readFile(`${userDir}/${file}`, "utf-8", (err, data) => {
      /* c8 ignore next */
      if (err) callback("Error on reading file.", undefined);
      else {
        // console.log("Data on read file:", data)
        const card = JSON.parse(data);
        collection.push(card);

        if (files.indexOf(file) === files.length - 1)
          callback(undefined, collection);
      }
    });
  });
};