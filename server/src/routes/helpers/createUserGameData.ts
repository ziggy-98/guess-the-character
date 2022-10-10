import { UserData, CharacterList } from "../../types";
import { getCharacters } from "./getCharacters";
import { buildRounds } from "./buildRounds";
import { cache } from "../../../index";

export const createUserGameData = async (
  uuid: string
): Promise<UserData | Error> => {
  return new Promise(async (resolve, reject) => {
    try {
      const characters = await getCharacters();
      if (characters) {
        const rounds = buildRounds(characters as CharacterList);
        const responseData = {
          score: 0,
          round: 0,
          rounds,
        };
        cache.set(uuid, responseData);
        resolve({
          [uuid]: responseData,
        } as UserData);
      }
    } catch (err) {
      reject(err as Error);
    }
  });
};
