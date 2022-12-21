import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function openAiTest() {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Create a hello world in python",
    temperature: 0.6,
  });
  console.log(completion.data.choices[0].text);
}

openAiTest();
