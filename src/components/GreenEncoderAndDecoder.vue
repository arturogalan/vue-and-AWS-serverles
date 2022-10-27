<script setup>
import { ref } from "vue";
import { useEncoder } from "@/composables/encoder.js";
import IconDocumentation from "@/components/icons/IconDocumentation.vue";

const { encode, decode } = useEncoder();

const textToEncrypt = ref("");
const textToDecrypt = ref("");

const encryptedText = ref("");
const decryptedText = ref("");
const encryptedError = ref("");
const decryptedError = ref("");

const handleEncryptClick = async () => {
  const { data, error } = await encode(textToEncrypt.value);
  encryptedText.value = data.value;
  encryptedError.value = error.value;
};
const handleDecryptClick = async () => {
  const { data, error } = await decode(textToDecrypt.value);
  decryptedText.value = data.value;
  decryptedError.value = error.value;
};
const fillExampleEncode = () => {
  textToEncrypt.value = "HELLO";
  handleEncryptClick();
};
const fillExampleDecode = () => {
  textToDecrypt.value = "216 3645 12 324 405";
  handleDecryptClick();
};
async function copyToClipboard(text) {
  // Internet Explorer
  if (window && window.clipboardData) {
    return window.clipboardData.setData("Text", text);
  }

  if (typeof navigator === "undefined") {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    return false;
  }
}
</script>

<template>
  <div>
    <h3 class="green">Encode a text</h3>
    <p class="text__description">
      Insert a text and press button or enter (E.g.
      <a @click="fillExampleEncode()" class="text__link">HELLO</a>)
    </p>
    <div class="action__wrapper">
      <div>
        <p class="text__label_tag">Input:</p>
        <input
          name="textToBeEncrypted"
          class="text__input"
          type="text"
          placeholder="text to encrypt"
          v-model="textToEncrypt"
          @keyup.enter="handleEncryptClick()"
        />
      </div>
      <button
        :disabled="!textToEncrypt"
        class="button"
        @click="handleEncryptClick()"
      >
        Encode
      </button>
      <div>
        <p class="text__label_tag">Result:</p>
        <input
          name="encryptedText"
          class="text__input"
          type="text"
          placeholder="Result"
          v-model="encryptedText"
          disabled
        />
      </div>
      <i
        class="icon__copyToClipboard"
        title="Copy to clipboard"
        @click="copyToClipboard(encryptedText)"
      >
        <IconDocumentation />
      </i>
      {{ encryptedError }}
    </div>
    <h3 class="green">Decode a text</h3>
    <p class="text__description">
      Insert an encoded text and press button or enter (E.g.
      <a @click="fillExampleDecode()" class="text__link">216 3645 12 324 405</a
      >)
    </p>
    <div class="action__wrapper">
      <div>
        <p class="text__label_tag">Input:</p>
        <input
          name="textToBeDecrypted"
          class="text__input"
          type="text"
          placeholder="text to decrypt"
          v-model="textToDecrypt"
          @keyup.enter="handleDecryptClick()"
        />
      </div>
      <button
        :disabled="!textToDecrypt"
        class="button"
        @click="handleDecryptClick()"
      >
        Decode
      </button>
      <div>
        <p class="text__label_tag">Result:</p>
        <input
          name="decryptedText"
          class="text__input"
          type="text"
          placeholder="Result"
          v-model="decryptedText"
          disabled
        />
      </div>
      <i
        class="icon__copyToClipboard"
        title="Copy to clipboard"
        @click="copyToClipboard(decryptedText)"
      >
        <IconDocumentation />
      </i>
      {{ decryptedError }}
    </div>
  </div>
</template>
<style>
.action__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
.text__description {
  margin-bottom: 2rem;
}
.text__input {
  padding: 9px;
  font-size: 1rem;
  min-width: 30vw;
}
.text__link {
  cursor: pointer;
}
.text__label_tag {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  position: absolute;
  bottom: 2.5rem;
}
.icon__copyToClipboard {
  cursor: pointer;
}
.button {
  font-size: 1rem;
  background-color: #36a9ae;
  border: 1px solid #2a8387;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 1px;
  color: #ffffff;
  cursor: pointer;
  display: block;
  padding: 11px;
}

.button:hover {
  background-color: #1d676b;
}

.button:disabled {
  background-color: #7e8e8f;
  cursor: default;
}
</style>
