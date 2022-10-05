import app from "../index";
import request from "supertest";
import { convertCompilerOptionsFromJson } from "typescript";

let server: any;

describe("Server startup", () => {
  beforeEach(() => {
    server = app;
  });
  it("Server starts up", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).toMatchObject({});
        done();
      });
  });
  afterEach(() => {
    server.close();
  });
});
