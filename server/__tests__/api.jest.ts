import {
  buildRounds,
  createUserGameData,
  getCharacters,
} from "../src/routes/helpers";
import testCharacterData from "./testCharacterData.json";
import testUserData from "./testUserData.json";
import app from "../src/index";
import { CharacterList } from "../src/types";
import request from "supertest";

let server: any;

describe("Start game", () => {
  beforeEach(() => {
    server = app;
  });

  it("Fetches a list of characters", () => {
    return getCharacters()
      .then((res) => {
        let characters = res as CharacterList;
        expect(characters).toBeInstanceOf(Array);
        expect(characters.length).toBeGreaterThan(0);
        expect(characters[0]).toEqual(
          expect.objectContaining({
            _id: expect.any(Number),
            url: expect.any(String),
            imageUrl: expect.any(String),
            name: expect.any(String),
            films: expect.any(Array),
            shortFilms: expect.any(Array),
            tvShows: expect.any(Array),
            videoGames: expect.any(Array),
            parkAttractions: expect.any(Array),
            allies: expect.any(Array),
            enemies: expect.any(Array),
          })
        );
      })
      .catch((err) => {
        throw err;
      });
  });

  it("Builds a list of 10 rounds from a character list", () => {
    const rounds = buildRounds(testCharacterData.data as CharacterList);
    expect(rounds).toBeInstanceOf(Array);
    expect(rounds).toHaveLength(10);
    expect(rounds[0]).toEqual(
      expect.objectContaining({
        character: expect.objectContaining({
          name: expect.any(String),
          image: expect.any(String),
        }),
        options: expect.any(Array),
        correctAnswer: expect.any(String),
      })
    );
  });

  it("Creates some default user data using the provided uuid", () => {
    const testUuid = "a09cfc9d-8a32-46bf-b98e-30352fbfe8b0";
    return createUserGameData(testUuid)
      .then((res) => {
        expect(res).toEqual(
          expect.objectContaining({
            [testUuid]: expect.objectContaining({
              score: 0,
              round: 0,
              rounds: expect.any(Array),
            }),
          })
        );
      })
      .catch((err) => {
        throw err;
      });
  });

  it("Populates game data for a new user when the user makes a call to /api/start-game", (done) => {
    const testUuid = "a09cfc9d-8a32-46bf-b98e-30352fbfe8b0";
    request(app)
      .post("/api/start-game")
      .send({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(
          expect.objectContaining({
            [testUuid]: expect.objectContaining({
              score: 0,
              round: 0,
              rounds: expect.any(Array),
            }),
          })
        );
        done();
      });
  });

  it("Sends back existing game data for an existing user when the user makes a call to /api/start-game", (done) => {
    const testUuid = "bdb47738-eade-4312-b063-6cff2a95709a";
    const testUserDataObject =
      testUserData["bdb47738-eade-4312-b063-6cff2a95709a"];
    request(app)
      .post("/api/start-game")
      .send({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(testUserDataObject);
        done();
      });
  });

  afterEach(() => {
    server.close();
  });
});
