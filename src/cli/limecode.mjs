#!/usr/bin/env node

import { Command } from "commander";
import fetch from "node-fetch";

const BACKEND_URL =
  "https://808de8cob5.execute-api.eu-west-3.amazonaws.com/default";
const ENCODE_URL = `${BACKEND_URL}/encode`;
const DECODE_URL = `${BACKEND_URL}/decode`;

async function encode(text) {
  let error;
  let data;
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
      error = jsonResponse.body;
    } else {
      data = jsonResponse.body;
    }
  } catch (err) {
    error = err;
  }
  return { data, error };
}

async function decode(text) {
  let data;
  let error;
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
      error = jsonResponse.body;
    } else {
      data = jsonResponse.body;
    }
  } catch (err) {
    error = err;
  }
  return { data, error };
}

const program = new Command();

program
  .description("Limecode: An application for encoding and decoding text")
  .version("0.0.1");
program
  .command("encode")
  .description("Encode a string.")
  .argument("<text>", "string to encode")
  .action(async (str) => {
    const { data, error } = await encode(str);
    if (error) {
      console.log(`Error trying to encode text "${str}": ${data} ${error}`);
    } else {
      console.log(`Encoded text: ${data}`);
    }
  });
program
  .command("decode")
  .description("Decode a string.")
  .argument("<text>", "string to decode")
  .action(async (str) => {
    const { data, error } = await decode(str);
    if (error) {
      console.log(`Error trying to decode text "${str}": ${data} ${error}`);
    } else {
      console.log(`Decoded text: ${data}`);
    }
  });
program.parse();

// Try the following on macOS or Linux:
//    node src/cli/limecode.mjs decode "8 5 324 8748 295245 730 23 405 13122 12 108"
//    node src/cli/limecode.mjs encode "my text"
