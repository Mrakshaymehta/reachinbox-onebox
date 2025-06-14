import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { startEmailSync } from './imap/syncManager';
import { searchEmails } from './elasticsearch/searchEmails';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.get('/api/search', async (req, res) => {
  const { q, folder, account } = req.query;
  console.log('Search query received:', { q, folder, account }); // 👈 add this

  try {
    const results = await searchEmails(q as string, folder as string, account as string);
    res.json(results);
  } catch (err) {
    console.error('Search failed:', err); // 👈 improved logging
    res.status(500).json({ error: 'Search failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startEmailSync(); // Start IMAP sync once server is running
});