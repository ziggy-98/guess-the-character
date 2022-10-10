import { CharacterList, Round, EmptyRound, Character } from "../../types";

export const buildRounds = (characters: CharacterList): Round[] => {
  const validCharacters = characters.filter(
    (character) => character.films.length > 0 || character.tvShows.length > 0
  );
  const [availableFilmsWithDupes, availableTvShowsWithDupes] =
    validCharacters.reduce<[string[], string[]]>(
      (acc, character) => {
        if (character.films.length > 0) {
          acc[0] = acc[0].concat(character.films);
        }
        if (character.tvShows.length > 0) {
          acc[1] = acc[1].concat(character.tvShows);
        }
        return acc;
      },
      [[], []]
    );
  const availableFilms = [...new Set(availableFilmsWithDupes)];
  const availableTvShows = [...new Set(availableTvShowsWithDupes)];
  const rounds: Round[] = [];
  const characterIndexes: number[] = getUniqueArray(
    validCharacters.length,
    [],
    10
  );
  characterIndexes.forEach((characterIndex) => {
    const character = validCharacters[characterIndex];
    let round: EmptyRound = {
      character: {
        name: character.name,
        image: character.imageUrl,
      },
    };
    if (character.films.length > 0 && character.tvShows.length > 0) {
      if (Math.floor(Math.random() * 2) === 1) {
        round = getOptionsAndCorrectAnswerForCharacter(
          character,
          "films",
          { ...round },
          availableFilms
        );
      } else {
        round = getOptionsAndCorrectAnswerForCharacter(
          character,
          "tvShows",
          { ...round },
          availableTvShows
        );
      }
    } else if (character.films.length > 0 && character.tvShows.length === 0) {
      round = getOptionsAndCorrectAnswerForCharacter(
        character,
        "films",
        { ...round },
        availableFilms
      );
    } else if (character.films.length === 0 && character.tvShows.length > 0) {
      round = getOptionsAndCorrectAnswerForCharacter(
        character,
        "tvShows",
        { ...round },
        availableTvShows
      );
    }
    rounds.push(round as Round);
  });
  return rounds;
};

const getOptionsAndCorrectAnswerForCharacter = (
  character: Character,
  medium: "films" | "tvShows",
  round: EmptyRound,
  availableArray: string[]
): EmptyRound => {
  round.correctAnswer =
    character[medium].length > 1
      ? character[medium][Math.floor(Math.random() * character[medium].length)]
      : character[medium][0];
  const validOptions = availableArray.filter(
    (option) => !character[medium].includes(option)
  );
  round.options = getUniqueArray(
    validOptions.length,
    [round.correctAnswer],
    4,
    validOptions
  );

  return round;
};

const getUniqueArray = (
  topOfRange: number,
  uniqueArray: any[],
  desiredLength: number,
  arrayToReadFrom: any[] = undefined
): any[] => {
  const randomNum = Math.floor(Math.random() * topOfRange);
  if (arrayToReadFrom) {
    if (!uniqueArray.includes(arrayToReadFrom[randomNum])) {
      uniqueArray.push(arrayToReadFrom[randomNum]);
    }
  } else {
    if (!uniqueArray.includes(randomNum)) {
      uniqueArray.push(randomNum);
    }
  }
  if (uniqueArray.length === desiredLength) {
    return uniqueArray;
  } else {
    return getUniqueArray(
      topOfRange,
      uniqueArray,
      desiredLength,
      arrayToReadFrom
    );
  }
};
