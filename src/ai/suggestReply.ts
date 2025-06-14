import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function suggestReply(emailText: string): Promise<string> {
  const prompt = `
You are an intelligent email assistant. Read the email content below and generate a smart, concise, and polite reply.

Email:
${emailText}

Reply:
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });

  return response.choices[0]?.message?.content?.trim() || '';
}