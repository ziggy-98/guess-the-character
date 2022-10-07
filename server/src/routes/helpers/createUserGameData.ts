import { UserData, CharacterList } from "../../types";
import { getCharacters } from "./getCharacters";
import { buildRounds } from "./buildRounds";

export const createUserGameData = async (
  uuid: string
): Promise<UserData | Error> => {
  return new Promise(async (resolve, reject) => {
    try {
      const characters = await getCharacters();
      if (characters) {
        let rounds = buildRounds(characters as CharacterList);
        resolve({
          [uuid]: {
            score: 0,
            round: 0,
            rounds: rounds,
          },
        } as UserData);
      }
    } catch (err) {
      reject(err as Error);
    }
  });
};
