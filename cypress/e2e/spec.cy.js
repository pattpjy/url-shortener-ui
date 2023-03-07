const urlStub = require("../fixtures/url.json");

describe("when a user visits the page", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/api/v1/urls",
      },
      { fixture: "url" }
    );
    cy.visit("http://localhost:3000/");
  });
  it("they can view the page title and the existing shortened URLs", () => {
    cy.get("h1").should("contain", "URL Shortener");
    cy.get("a").should("contain", urlStub.urls[0].short_url);
  });
  it("they can view the Form with the proper inputs", () => {
    cy.get("form").should("be.visible");
    cy.get(
      "#root > main > header > form > input[type=text]:nth-child(1)"
    ).should("have.attr", "placeholder");

    cy.get(
      "#root > main > header > form > input[type=text]:nth-child(2)"
    ).should("have.attr", "placeholder");
    cy.get('[placeholder="Title..."]').should("be.visible");
    cy.get('[placeholder="URL to Shorten..."]').should("be.visible");
    it("the information is reflected in the input fields", () => {
      cy.get('[placeholder="Title..."]')
        .type("Comet")
        .should("have.value", "Comet");
      cy.get('[placeholder="URL to Shorten..."]')
        .type("Comet")
        .should("have.value", "Comet");
    });
  });
});
describe("When a user fills out and submits the form", () => {
  it("the new shortened URL is rendered", () => {
    cy.get('[placeholder="Title..."]').type("Comet");
  });
});
