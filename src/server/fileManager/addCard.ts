import fs from "fs";
import { ICard } from "../../types/ICard.js";
import { CARDS_DIR } from "../consts.js";

/**
 * Add a new card to the collection for a user
 * @param user name of the user
 * @param card card to add
 * @param callback
 */
export const addCard = (
  user: string,
  card: ICard,
  callback: (err: string | undefined) => void,
) => {
  const userDir = `${CARDS_DIR}/${user}`;

  // Check if the user directory exists
  fs.readdir(userDir, (err) => {
    if (err) {
      // Create the user directory
      fs.mkdir(userDir, (err) => {
        if (err) {
          callback("Error on create dir");
        } else {
          fs.writeFile(
            `${userDir}/${card.id}.json`,
            JSON.stringify(card),
            (err) => {
              if (err) {
                callback("Error on write file");
              } else {
                callback(undefined);
              }
            },
          );
        }
      });
    } else {
      // Check if the card file exists
      checkFileExists(`${userDir}/${card.id}.json`, (exists) => {
        if (exists) {
          callback("Card already exists");
        } else {
          // Write the card file
          fs.writeFile(
            `${userDir}/${card.id}.json`,
            JSON.stringify(card),
            (err) => {
              /* c8 ignore next 2 */
              if (err) {
                callback("Error on write file");
              } else {
                callback(undefined);
              }
            },
          );
        }
      });
    }
  });
};

/**
 * Check if a file exists
 * @param filePath
 * @param callback
 */
function checkFileExists(
  filePath: string,
  callback: (exists: boolean) => void,
) {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    callback(!err);
  });
}
