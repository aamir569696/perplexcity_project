import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

// export async function testGemini(req, res) {
//   await model.invoke("what is AI explain under 10 words?").then((response) => {
//     console.log(response.text);
//   });
// }
