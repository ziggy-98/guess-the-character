import { CharacterList } from "./characterList";

export interface CharacterResponse {
  data: CharacterList;
  count: number;
  totalPages: number;
  previousPage?: string;
  nextPage?: string;
}
