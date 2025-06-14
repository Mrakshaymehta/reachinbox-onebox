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

export async function searchEmails(query = '', folder?: string, account?: string) {
  const must: any[] = [];

  if (query) {
    must.push({
      multi_match: {
        query,
        fields: ['subject', 'from', 'text'],
        fuzziness: 'AUTO'
      }
    });
  }

  if (folder) {
    must.push({ match: { folder } });
  }

  if (account) {
    must.push({ match: { account } });
  }

  // ✅ Define body separately without any conditional logic inside the object
  const queryBody: Record<string, any> = must.length > 0
    ? { query: { bool: { must } } }
    : { query: { match_all: {} } };

  const result = await esClient.search<EmailDocument>({
    index: 'emails',
    body: queryBody
  });

  return result.hits.hits.map(hit => hit._source as EmailDocument);
}