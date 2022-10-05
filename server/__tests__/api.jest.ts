import app from "../index";

let server: any;

describe("Start game", () => {
  beforeEach(() => {
    server = app;
  });

  it("Fetches a list of characters", (done) => {});

  it("Builds a list of 10 rounds from a character list", (done) => {});

  it("Creates some default user data using the provided uuid", (done) => {});

  it("Populates game data when the user makes a call to /api/start-game", (done) => {});

  afterEach(() => {
    server.close();
  });
});
