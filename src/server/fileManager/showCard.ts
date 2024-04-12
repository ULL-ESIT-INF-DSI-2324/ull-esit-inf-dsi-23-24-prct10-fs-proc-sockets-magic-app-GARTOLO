import fs from "fs";
import {ICard} from "../../types/ICard.js";
import {CARDS_DIR} from "../consts.js";

/**
 * List one card in the collection for a user
 * @param user name of the user
 * @param cardId id of the card
 * @param callback
 */
export const showCard = (
  user: string,
  cardId: number,
  callback: (err: string | undefined, data: ICard | undefined) => void,
) => {
  const userDir = `${CARDS_DIR}/${user}`;

  // Check if the user directory exists
  fs.readdir(userDir, (err, data) => {
    if (err) {
      callback("Error on read dir. User does not exists", undefined);
    } else {
      // Read the card file
      fs.readFile(`${userDir}/${cardId}.json`, "utf-8", (err, data) => {
        if (err) {
          callback("Error on read file. Card does not exists", undefined);
        } else {
          const card = JSON.parse(data);
          callback(undefined, card);
        }
      });
    }
  });
}