import fs from "fs";
import { ICard } from "../../types/ICard.js";
import { CARDS_DIR } from "../consts.js";

/**
 * Remove a card from the collection for a user
 * @param user name of the user
 * @param cardId id of the card
 * @param callback
 */
export const removeCard = (
  user: string,
  cardId: number,
  callback: (err: string | undefined, data: string | undefined) => void,
) => {
  const userDir = `${CARDS_DIR}/${user}`;

  // Check if the user directory exists
  fs.readdir(userDir, (err) => {
    if (err) {
      callback("Error on read dir. User does not exists", undefined);
    } else {
      // Remove the card file
      fs.unlink(`${userDir}/${cardId}.json`, (err) => {
        if (err) {
          callback("Error on remove file. Card does not exists", undefined);
        } else {
          callback(undefined, "Card removed successfully");
        }
      });
    }
  });
};
