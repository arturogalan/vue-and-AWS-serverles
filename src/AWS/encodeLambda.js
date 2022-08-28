exports.handler = async (event) => {
  // TODO implement
  let requestBody = event;
  let statusCode = 200;
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
    if (!event || !event.text) {
      throw new Error(
        `Request malformed or doesn't contain required 'text' field: "${JSON.stringify(
          event
        )}"`
      );
    }
    const decodedText = encodeUserInput(requestBody.text);
    statusCode = "200";
    body = decodedText;
  } catch (err) {
    statusCode = "400";
    body = "Error processing: " + err.message;
  }

  return {
    statusCode,
    body,
  };
};
