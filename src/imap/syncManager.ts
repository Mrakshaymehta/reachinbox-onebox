/// <reference path="../declarations.d.ts" />
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';

type IMAPAccount = {
  host: string;
  user: string;
  pass: string;
};

async function syncAccount(account: IMAPAccount) {
  const client = new ImapFlow({
    host: account.host,
    port: 993,
    secure: true,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  await client.connect();
  console.log(`Connected to IMAP: ${account.user}`);

  await client.mailboxOpen('INBOX');

  client.on('exists', async () => {
    console.log(`New email for ${account.user}`);

    for await (let msg of client.fetch('1:*', { envelope: true, source: true })) {
      const parsed = await simpleParser(msg.source);
      console.log({
        from: parsed.from?.text,
        subject: parsed.subject,
        text: parsed.text?.substring(0, 100),
      });

      // TODO: Index in Elastic + AI Categorize + Notify
    }
  });
}

export async function startEmailSync() {
  const accounts: IMAPAccount[] = [
    {
      host: process.env.EMAIL1_HOST!,
      user: process.env.EMAIL1_USER!,
      pass: process.env.EMAIL1_PASS!
    },
   // {
    //  host: process.env.EMAIL2_HOST!,
     // user: process.env.EMAIL2_USER!,
     // pass: process.env.EMAIL2_PASS!
   // }
  ];

  for (const account of accounts) {
    syncAccount(account);
  }
}