import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    name: { type: String, required: true },
    rank: { type: Number, default: 0 },
    user: { type: String, default: '' },
    score: { type: Number, default: 0 },
});
const Leaderboard = model('Leaderboard', leaderboardSchema);
export default Leaderboard;
