import { handler } from "../encodeHandler.js";
import { describe, it, expect } from "vitest";

describe("Decode handler", () => {
  const testCases = [
    { encodedText: "13 1 26 5", decodedText: "MAZE" },
    {
      encodedText: "15 2 19 5 18 22 1 2 9 12 9 20 25 28 1 19 28 3 15 4 5",
      decodedText: "OBSERVABILITY AS CODE",
    },
    {
      encodedText: "2 1 19 5 12 9 13 5 28 20 5 3 8",
      decodedText: "BASELIME TECH",
    },
    {
      encodedText: "8 5 12 12 15 28 23 15 18 12 4",
      decodedText: "HELLO WORLD",
    },
  ];
  testCases.forEach((testCase) => {
    it(`encodes properly ${testCase.decodedText}`, async () => {
      const handlerResponse = await handler({
        body: JSON.stringify({ text: testCase.decodedText }),
      });
      const response = JSON.parse(handlerResponse.body);
      console.log(response.text);
      expect(response.text).toContain(testCase.encodedText);
    });
  });
});
