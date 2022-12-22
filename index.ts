import { Client } from "whatsapp-web.js";
import { Configuration, OpenAIApi } from "openai";

import { generate } from "qrcode-terminal";

const clientWhatsApp = new Client({
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function openAIGenerateResponseByText(text: string) {
  return openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 1000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["{}"],
    })
    .then((response) => {
      return response.data.choices[0].text;
    });
}

clientWhatsApp.on("qr", (qr) => {
  console.log(qr);
  generate(qr);
});

clientWhatsApp.on("ready", () => {
  console.log("Client WhatsApp is ready!");
});

clientWhatsApp.initialize();

clientWhatsApp.on("message", (message) => {
  if (message.body[0] === "*") {
    console.log(message.body);
    openAIGenerateResponseByText(message.body).then((response) => {
      message.reply(response);
    });
  }
});
