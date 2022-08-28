import { ref } from "vue";
const BACKEND_URL =
  "https://808de8cob5.execute-api.eu-west-3.amazonaws.com/default";
const ENCODE_URL = `${BACKEND_URL}/encode`;
const DECODE_URL = `${BACKEND_URL}/decode`;

export function useEncoder() {
  async function encode(text) {
    const data = ref(null);
    const error = ref(null);
    const url = ENCODE_URL;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    };
    try {
      const response = await fetch(url, requestOptions);
      const jsonResponse = await response.json();
      if (jsonResponse.statusCode !== "200") {
        error.value = jsonResponse.body;
      } else {
        data.value = jsonResponse.body;
      }
    } catch (err) {
      error.value = err;
    }
    return { data, error };
  }
  async function decode(text) {
    const data = ref(null);
    const error = ref(null);
    const url = DECODE_URL;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    };
    try {
      const response = await fetch(url, requestOptions);
      const jsonResponse = await response.json();
      if (jsonResponse.statusCode !== "200") {
        error.value = jsonResponse.body;
      } else {
        data.value = jsonResponse.body;
      }
    } catch (err) {
      error.value = err;
    }
    return { data, error };
  }
  return { encode, decode };
}
