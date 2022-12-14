import app from "../index";
import request from "supertest";

let server: any;

describe("Server startup", () => {
  beforeEach(() => {
    server = app;
  });
  it("Server starts up", (done) => {
    request(app)
      .get("/")
      .expect(302)
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
