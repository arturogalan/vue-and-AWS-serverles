import { handler } from "../decodeHandler.js";
import { describe, it, expect } from "vitest";

describe("Decode handler", () => {
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
    it(`encodes properly ${testCase.encodedText}`, async () => {
      const handlerResponse = await handler({
        body: JSON.stringify({ text: testCase.encodedText }),
      });
      const response = JSON.parse(handlerResponse.body);
      console.log(response.text);
      expect(response.text).toContain(testCase.decodedText);
    });
  });
});
