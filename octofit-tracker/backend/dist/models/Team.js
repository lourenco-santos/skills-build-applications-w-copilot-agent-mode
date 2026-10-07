import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true },
    members: { type: [String], default: [] },
    points: { type: Number, default: 0 },
});
const Team = model('Team', teamSchema);
export default Team;
