import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;
export async function connectDatabase() {
    await mongoose.connect(connectionString);
}
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', () => {
    console.log('Connected to octofit_db');
});
export default db;
