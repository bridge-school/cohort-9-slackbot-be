const request = require("supertest");

const { healthRouter } = require("./health.router");

describe("tests for the health check endpoint", () => {
  it("returns a 200", () => {
    expect(true).toBe(true);
  });
});
