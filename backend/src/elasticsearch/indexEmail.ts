import { esClient } from './client';

type EmailDocument = {
  subject: string;
  from: string;
  text: string;
  html?: string;
  date: Date;
  folder: string;
  account: string;
  category?: string;
};

export async function indexEmail(email: EmailDocument): Promise<void> {
  await esClient.index({
    index: 'emails',
    body: email
  });
}