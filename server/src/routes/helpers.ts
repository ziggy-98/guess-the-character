import { CharacterList, Round, UserDataObject } from "../types";

export const getCharacters = (): Promise<CharacterList | Error> => {
  return new Promise((resolve, reject) => {
    resolve([]);
  });
};

export const buildRounds = (characters: CharacterList): Round[] => {
  return [];
};

export const createUserGameData = (uuid: string): UserDataObject => {
  return;
};
