import { Configuration, OpenAIApi } from "openai";

const API_KEY = "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";
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function useOpenAI(prompt, suffix) {
  return openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    suffix: suffix,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
}

export default useOpenAI;
