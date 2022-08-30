export const handler = async (event) => {
  let statusCode = "200";
  let body;

  const A_CHAR_CODE = "A".charCodeAt(0);
  const Z_CHAR_CODE = "Z".charCodeAt(0);
  const SPACE_CHAR_CODE = " ".charCodeAt(0);

  const encodeUserInput = (text) => {
    const charsArray = text.split("").map((char) => char.toUpperCase());
    const encryptedArray = charsArray.map((decriptedChar) => {
      const decriptedCharCode = decriptedChar.charCodeAt(0);
      if (decriptedCharCode === SPACE_CHAR_CODE) return 28;
      if (decriptedCharCode < A_CHAR_CODE || decriptedCharCode > Z_CHAR_CODE)
        return "*";
      return decriptedCharCode - A_CHAR_CODE + 1;
    });
    return encryptedArray.join(" ");
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
    const encodedText = encodeUserInput(requestBody.text);
    statusCode = "200";
    body = JSON.stringify({ text: encodedText });
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
