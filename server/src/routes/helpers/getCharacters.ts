import https from "https";
import { CharacterList, CharacterResponse } from "../../types";

export const getCharacters = async (): Promise<CharacterList | Error> => {
  return new Promise(async (resolve, reject) => {
    try {
      let characters: CharacterList = [];
      let firstPage: CharacterResponse = (await getPage()) as CharacterResponse;
      characters = characters.concat(firstPage.data);
      let totalPages = firstPage.count;
      let secondPage: CharacterResponse = (await getPage(
        Math.floor(Math.random() * totalPages)
      )) as CharacterResponse;
      characters = characters.concat(secondPage.data);
      resolve(characters);
    } catch (err) {
      reject(err as Error);
    }
  });
};

const getPage = (
  pageNum: number = undefined
): Promise<CharacterResponse | Error> => {
  return new Promise((resolve, reject) => {
    let pageString = "";
    try {
      https.get(
        `https://api.disneyapi.dev/characters${
          pageNum ? `?page=${pageNum}` : ""
        }`,
        (res) => {
          res.on("data", (data) => {
            pageString += data;
          });
          res.on("end", () => {
            resolve(JSON.parse(pageString));
          });
        }
      );
    } catch (err) {
      reject(err as Error);
    }
  });
};
