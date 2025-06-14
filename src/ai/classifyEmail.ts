import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function classifyEmail(subject: string, text: string): Promise<string> {
  const prompt = `
You are an intelligent email classifier. Categorize the email into one of these categories:
["work", "personal", "finance", "shopping", "social", "travel", "updates", "spam"]

Email:
Subject: ${subject}
Content: ${text}

Category:
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2
  });

  const category = response.choices[0].message.content?.trim().toLowerCase();
  return category || 'unclassified';
}