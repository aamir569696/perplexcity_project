import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage,SystemMessage,AIMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";


const GeminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

const MistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateTtile(message) {
  const response = await MistralModel.invoke([
    new SystemMessage(
      "You are a helpful assistant that generates a title for the given message. The title should be concise, relevant, and capture the essence of the message.",
    ),
    new HumanMessage(`
      generate a title for the following message: "${message}". The title should be concise, relevant, and capture the essence of the message and 2 to 3 word length. Please provide only the title without any additional text or explanation.
      `),
  ]);

  return response.text;
}

export async function generateResponse(messages) {

   if (!messages || messages.length === 0) {
    throw new Error("Messages array is empty");
  }

  const response = await GeminiModel.invoke(messages.map ((msg)=>{
    if(msg.role === 'user'){
      return new HumanMessage(msg.content);
    }else if(msg.role === 'assistant'){
      return new AIMessage(msg.content);
    }
  })  );

  return response.text;
}
