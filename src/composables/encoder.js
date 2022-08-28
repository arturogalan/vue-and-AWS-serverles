import { ref } from "vue";

export function useEncoder() {
  async function encode(text) {
    const data = ref(null);
    const error = ref(null);
    const url =
      "https://808de8cob5.execute-api.eu-west-3.amazonaws.com/default/encode";
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
      debugger;
      if (response.status !== 200) {
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
    const url =
      "https://808de8cob5.execute-api.eu-west-3.amazonaws.com/default/decode";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    };
    try {
      const response = await fetch(url, requestOptions);
      const jsonResponse = await response.json();
      if (response.status !== 200) {
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
