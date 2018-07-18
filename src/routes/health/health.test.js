const request = require("supertest");

const { healthRouter } = require("./health.router");
const { app } = require("../../index");

describe("tests for the health check endpoint", () => {
  it("returns a 200", () => {
    return request(app)
      .get("/health")
      .expect(200);
  });
});
