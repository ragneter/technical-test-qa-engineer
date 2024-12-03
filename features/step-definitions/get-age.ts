import { Given, When, Then, World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import supertest from "supertest";
import { expect } from "chai"
import TestAgent from "supertest/lib/agent.js";
// import Test from "supertest/lib/test";

const request: TestAgent = supertest("https://api.agify.io");

type EstimatedAgeResult = { 
  count: number,
  name: string,
  age: number,
  country_id?: string
}

When("I send a GET request to the API with a valid {string} query parameter", async function (name: string) {
  this.response = await request.get("/").query({ "name": name });
});

When("I send a GET request to the API with multiple valid name query parameters", async function () {
  this.response = await request.get("/?name[]=mike&name[]=bob&name[]=jane");
})

When("I send a GET request to the API with a valid {string} country ID query parameter", async function (countryId: string) {
  this.response = await request.get("/").query({ "name": "bob" }).query({ "country_id": countryId });
})

When('I send a GET request to the API with an invalid API key', async function () {
  this.response = await request.get("/").query({ "name": "bob" }).query({ apikey: "INVALID_KEY" });
})

When("I send a GET request to the API without providing the name parameter", async function () {
  this.response = await request.get("/");
})

When("I send a GET request to the API with an invalid name parameter", async function () {
  return 'pending';
})

Then("the API should respond with status code {int}", async function (statusCode: number) {
  expect(this.response.status).to.equal(statusCode);
});

Then("the response should contain an estimated age, count and name", async function () {
  const responseBody: EstimatedAgeResult = this.response.body;

  expect(responseBody.age).to.be.a("number");
  expect(responseBody.name).to.be.a("string");
  expect(responseBody.count).to.be.a("number");
});

Then("the response should be in JSON format", async function () {
  expect(this.response.headers["content-type"]).to.have.string("application/json");
});

Then("the response contains the {string} error", async function (errorDescription: string) {
  expect(this.response.body).to.include({ "error": errorDescription });
})

Then("the response should include a list of items, each with an estimated age", async function () {
  const responseBody: EstimatedAgeResult[] = this.response.body;
  expect(responseBody.length).to.equal(3);

  for(let item of responseBody) {
    expect(item.age).to.be.a("number");
    expect(item.name).to.be.a("string");
    expect(item.count).to.be.a("number");
  }
})
