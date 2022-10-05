import app from "../index";
import request from "supertest";
import { convertCompilerOptionsFromJson } from "typescript";

var server: any;

describe("Server startup", () => {
  beforeEach(() => {
    server = app;
  });
  it("Server starts up on port 3000", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).toBeUndefined();
        done();
      });
  });
  afterEach(() => {
    server.close();
  });
});
