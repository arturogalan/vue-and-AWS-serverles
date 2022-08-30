// https://docs.cypress.io/api/introduction/api.html

describe("Limecode tests", () => {
  it("visits the app root url, and click on the examples provided in the description to encode a text", () => {
    cy.visit("/");
    cy.contains("h1", "Limecode");
    cy.contains(/HELLO/i).click();
    cy.get('input[name="encryptedText"]').should("have.value", "8 5 12 12 15");
  });
  it("visits the app root url, and click on the examples provided in the description to decode a text", () => {
    cy.visit("/");
    cy.contains("h1", "Limecode");
    cy.contains(/216 3645 12 324 405/i).click();
    cy.get('input[name="decryptedText"]').should("have.value", "HELLO");
  });
  const testCases = [
    { encodedText: "13 27 26 5", decodedText: "MAZE" },
    {
      encodedText:
        "7971615 39366 373977 98415 13122 433026 19683 39366 4782969 6377292 177147 14580 675 756 19683 373977 551124 81 10935 2125764 3645",
      decodedText: "OBSERVABILITY AS CODE",
    },
    {
      encodedText:
        "54 531441 513 2657205 324 177147 6908733 2657205 551124 540 3645 81 216",
      decodedText: "BASELIME TECH",
    },
    {
      encodedText: "8 5 324 8748 295245 730 23 405 13122 12 108",
      decodedText: "HELLO WORLD",
    },
  ];

  testCases.forEach((testCase) => {
    it(`visits the app root url, write ${testCase.encodedText}, click decode and get ${testCase.decodedText} as response`, () => {
      cy.visit("/");
      cy.contains("h1", "Limecode");
      cy.get('input[name="textToBeDecrypted"]').type(testCase.encodedText);
      cy.contains("button", "Decode").as("decodeButton");
      cy.get('input[name="textToBeDecrypted').should(
        "have.value",
        testCase.encodedText
      );
      cy.get("@decodeButton").click();
      cy.get('input[name="decryptedText"]').should(
        "have.value",
        testCase.decodedText
      );
    });
  });
});
