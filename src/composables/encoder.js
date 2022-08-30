import { ref } from "vue";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
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
      if (response.status !== 200) {
        error.value = jsonResponse.error;
      } else {
        data.value = jsonResponse.text;
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
      if (response.status !== 200) {
        error.value = jsonResponse.error;
      } else {
        data.value = jsonResponse.text;
      }
    } catch (err) {
      error.value = err;
    }
    return { data, error };
  }
  return { encode, decode };
}
