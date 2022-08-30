export const handler = async (event) => {
  let statusCode = "200";
  let body;

  const A_CHAR_CODE = "A".charCodeAt(0);
  const SEED_LIMIT = 27;
  const SEPARATOR = " ";

  const decodeUserInput = (text) => {
    const numbersArray = text.includes(SEPARATOR)
      ? text.split(SEPARATOR)
      : [text];
    const reduceNum = (num) => {
      if (num % SEED_LIMIT) return num;
      return reduceNum(num / SEED_LIMIT);
    };

    const decryptedArray = numbersArray.map((encryptedNumber) => {
      const numberSeedDivision = encryptedNumber / SEED_LIMIT;
      const divisionIsFloat = numberSeedDivision % 1 > 0;
      if (encryptedNumber > SEED_LIMIT && divisionIsFloat) return " ";
      if (isNaN(encryptedNumber) || encryptedNumber < 1) return "*";
      const baseSeedNumber =
        encryptedNumber < SEED_LIMIT
          ? encryptedNumber
          : reduceNum(numberSeedDivision);
      if (baseSeedNumber > SEED_LIMIT) return " ";
      return String.fromCharCode(A_CHAR_CODE + Number(baseSeedNumber) - 1);
    });
    return decryptedArray.join("");
  };

  try {
    let requestBody = JSON.parse(event.body);

    if (!requestBody || !requestBody.text) {
      throw new Error(
        `Request malformed or doesn't contain required 'text' field: "${JSON.stringify(
          requestBody
        )}"`
      );
    }
    const decodedText = decodeUserInput(requestBody.text);
    statusCode = "200";
    body = JSON.stringify({ text: decodedText });
  } catch (err) {
    statusCode = "400";
    body = JSON.stringify({ error: "Error processing: " + err.message });
  }

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    statusCode,
    body,
  };
};
