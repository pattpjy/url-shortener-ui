const urlStub = require("../fixtures/url.json");
const postUrl = require("../fixtures/posturl.json");

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
    cy.intercept(
      {
        method: "POST",
        url: "http://localhost:3001/api/v1/urls",
      },
      {
        id: 2,
        long_url:
          "https://images.unsplash.com/photo-1532798369041-b33eb576ef16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60",
        short_url: "http://localhost:3001/useshorturl/2",
        title: "Another Awesome photo",
      }
    );
    cy.get("button").click();
    cy.get("section > :nth-child(1)").contains("a", postUrl.urls[0].short_url);
  });
});

describe("When API return an error", () => {
  it("Should show error message", () => {
    const errorAPI = {
      error: "No short URL is found with id:99999",
    };

    cy.visit("http://localhost:3000").intercept(
      "get",
      "http://localhost:3001/api/v1/urls",
      {
        statusCode: 404,
        body: errorAPI,
      }
    );
    cy.get("p").should("contain", "No urls yet! Find some to shorten!");
  });
});
