import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/users/', (_req, res) => {
  res.json([
    { id: 1, name: 'Mona', email: 'mona@example.com' },
    { id: 2, name: 'Alex', email: 'alex@example.com' },
  ]);
});

app.get('/api/teams/', (_req, res) => {
  res.json([
    { id: 1, name: 'Octocats', points: 1200 },
    { id: 2, name: 'Trailblazers', points: 980 },
  ]);
});

app.get('/api/activities/', (_req, res) => {
  res.json([
    { id: 1, name: 'Run', duration: 30, calories: 320 },
    { id: 2, name: 'Swim', duration: 25, calories: 210 },
  ]);
});

app.get('/api/leaderboard/', (_req, res) => {
  res.json([
    { id: 1, rank: 1, user: 'Mona', score: 1200 },
    { id: 2, rank: 2, user: 'Alex', score: 980 },
  ]);
});

app.get('/api/workouts/', (_req, res) => {
  res.json([
    { id: 1, name: 'Intervals', difficulty: 'medium', duration: 20 },
    { id: 2, name: 'Core Blast', difficulty: 'hard', duration: 15 },
  ]);
});

app.listen(port, async () => {
  await connectDatabase();
  console.log(`Octofit API server running on ${baseUrl}`);
});

export { app, baseUrl };
