#!/usr/bin/env node

import { Command } from "commander";
import fetch from "node-fetch";

// eslint-disable-next-line no-undef
const BACKEND_URL = process.env.BACKEND_URL;
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
    if (response.status !== 200) {
      error = jsonResponse.error;
    } else {
      data = jsonResponse.text;
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
    if (response.status !== 200) {
      error = jsonResponse.error;
    } else {
      data = jsonResponse.text;
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
