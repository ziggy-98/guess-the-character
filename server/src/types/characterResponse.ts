import { CharacterList } from "./characterList";

export interface CharacterResponse {
  data: CharacterList;
  count: number;
  previousPage: string;
  nextPage: string;
}
