import {
  buildRounds,
  createUserGameData,
  getCharacters,
} from "../src/routes/helpers";
import testCharacterData from "./data/testCharacterData.json";
import testUserData from "./data/testUserData.json";
import app, { cache } from "../index";
import { CharacterList } from "../src/types";
import request from "supertest";
import NodeCache from "node-cache";

let server: any;

beforeEach(() => {
  server = app;
  cache.mset(
    (Object.keys(testUserData) as Array<keyof typeof testUserData>).reduce<
      NodeCache.ValueSetItem[]
    >((acc, currentUserDataObj) => {
      acc.push({
        key: currentUserDataObj,
        val: testUserData[currentUserDataObj],
      });
      return acc;
    }, [])
  );
});

describe("Start game", () => {
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
    request(server)
      .post("/api/start-game")
      .send({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual({
          uuid: testUuid,
          round: 0,
        });
        done();
      });
  });

  it("Sends back existing game data for an existing user when the user makes a call to /api/start-game", (done) => {
    const testUuid = "bdb47738-eade-4312-b063-6cff2a95709a";
    const testUserDataObject =
      testUserData["bdb47738-eade-4312-b063-6cff2a95709a"];
    request(server)
      .post("/api/start-game")
      .send({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual({
          uuid: testUuid,
          round: testUserDataObject.round,
        });
        done();
      });
  });

  it("Sends back a new uuid and round if no uuid was supplied", (done) => {
    request(server)
      .post("/api/start-game")
      .send({ uuid: undefined })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual({
          uuid: expect.any(String),
          round: 0,
        });
        done();
      });
  });
});

describe("Reset game", () => {
  it("Resets the user data for the supplied uuid to default values", (done) => {
    const testUuid = "bdb47738-eade-4312-b063-6cff2a95709a";
    request(server)
      .post("/api/reset")
      .send({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done();
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
  it("Defaults to creating a new game instance if the provided uuid does not exist", (done) => {
    const testUuid = "a09cfc9d-8a32-46bf-b98e-30352fbfe8b0";
    request(server)
      .post("/api/reset")
      .send({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done();
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
});

describe("Get current score", () => {
  it("Fetches the score for the current user", (done) => {
    const testUuid = "bdb47738-eade-4312-b063-6cff2a95709a";
    request(server)
      .get("/api/score")
      .query({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(parseInt(res.text)).toEqual(testUserData[testUuid].score);
        done();
      });
  });
  it("Should send back a 0 if the user cannot be found in the cache", (done) => {
    const testUuid = "a09cfc9d-8a32-46bf-b98e-30352fbfe8b0";
    request(server)
      .get("/api/score")
      .query({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(parseInt(res.text)).toEqual(0);
        done();
      });
  });
});

describe("Submit answer", () => {
  it("Updates the score and sends back a positive message if the user picked the correct answer", (done) => {
    const testUuid = "bdb47738-eade-4312-b063-6cff2a95709a";
    const answer = "Alladin";
    request(server)
      .patch("/api/submit-answer")
      .send({
        uuid: testUuid,
        round: testUserData[testUuid].rounds[testUserData[testUuid].round],
        answer: answer,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(
          expect.objectContaining({
            userData: expect.objectContaining({
              score: testUserData[testUuid].score + 1,
              round: testUserData[testUuid].round,
              rounds: testUserData[testUuid].rounds,
            }),
            correct: true,
          })
        );
        done();
      });
  });

  it("Score does not change and negative message is sent back if the user picked the wrong answer", (done) => {
    const testUuid = "bdb47738-eade-4312-b063-6cff2a95709a";
    const answer = "Tangled";
    request(server)
      .patch("/api/submit-answer")
      .send({
        uuid: testUuid,
        round: testUserData[testUuid].rounds[testUserData[testUuid].round],
        answer: answer,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(JSON.parse(res.text)).toEqual(
          expect.objectContaining({
            userData: expect.objectContaining({
              score: testUserData[testUuid].score,
              round: testUserData[testUuid].round,
              rounds: testUserData[testUuid].rounds,
            }),
            correct: false,
          })
        );
        done();
      });
  });
});

describe("Get Round", () => {
  it("Should return the current round if a valid uuid has been supplied", (done) => {
    const testUuid = "bdb47738-eade-4312-b063-6cff2a95709a";
    const testRound = testUserData[testUuid].rounds[3];
    request(server)
      .get("/api/round")
      .query({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done();
        expect(JSON.parse(res.text)).toEqual(
          expect.objectContaining({
            character: {
              name: testRound.character.name,
              image: testRound.character.image,
            },
            options: testRound.options,
            correctAnswer: testRound.correctAnswer,
          })
        );
        done();
      });
  });
  it("Should return an empty object if no uuid is supplied", (done) => {
    request(server)
      .get("/api/round")
      .expect(200)
      .end((err, res) => {
        if (err) return done();
        expect(JSON.parse(res.text)).toEqual(expect.objectContaining({}));
        done();
      });
  });
  it("Should return an empty object if a uuid is supplied that doesn't exist", (done) => {
    const testUuid = "a09cfc9d-8a32-46bf-b98e-30352fbfe8b0";
    request(server)
      .get("/api/round")
      .query({ uuid: testUuid })
      .expect(200)
      .end((err, res) => {
        if (err) return done();
        expect(JSON.parse(res.text)).toEqual(expect.objectContaining({}));
        done();
      });
  });
});

afterEach(() => {
  server.close();
});
