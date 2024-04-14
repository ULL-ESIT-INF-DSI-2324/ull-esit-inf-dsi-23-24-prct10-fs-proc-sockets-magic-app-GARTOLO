import fs from "fs";
import { ICard } from "../../types/ICard.js";
import { CARDS_DIR } from "../consts.js";

/**
 * Update a card in the collection for a user
 * @param user name of the user
 * @param card card to add
 * @param callback
 */
export const updateCard = (
  user: string,
  card: ICard,
  callback: (err: string | undefined) => void,
) => {
  const userDir = `${CARDS_DIR}/${user}`;

  // Check if the user directory exists
  fs.readdir(userDir, (err) => {
    if (err) {
      callback("Error on read dir. User does not exists");
    } else {
      // Read the card file
      fs.readFile(`${userDir}/${card.id}.json`, "utf-8", (err, data) => {
        /* c8 ignore next 2 */
        if (err) {
          callback("Error on read file. Card does not exists");
        } else {
          const cardData = JSON.parse(data);
          const updatedCard = {
            ...cardData,
            ...card,
          };
          // Write the card file
          fs.writeFile(
            `${userDir}/${card.id}.json`,
            JSON.stringify(updatedCard),
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
