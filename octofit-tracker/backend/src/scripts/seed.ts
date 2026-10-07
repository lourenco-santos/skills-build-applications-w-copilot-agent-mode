import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    await User.insertMany([
      { name: 'Mona', email: 'mona@example.com', workouts: ['Running', 'Yoga'] },
      { name: 'Alex', email: 'alex@example.com', workouts: ['Cycling', 'Strength'] },
    ]);

    await Team.insertMany([
      { name: 'Octocats', members: ['Mona', 'Alex'], points: 1200 },
      { name: 'Trailblazers', members: ['Sam', 'Jules'], points: 980 },
    ]);

    await Activity.insertMany([
      { name: 'Run', duration: 30, calories: 320, user: 'Mona' },
      { name: 'Swim', duration: 25, calories: 210, user: 'Alex' },
    ]);

    await Leaderboard.insertMany([
      { name: 'Weekly', rank: 1, user: 'Mona', score: 1200 },
      { name: 'Weekly', rank: 2, user: 'Alex', score: 980 },
    ]);

    await Workout.insertMany([
      { name: 'Intervals', difficulty: 'medium', duration: 20 },
      { name: 'Core Blast', difficulty: 'hard', duration: 15 },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
