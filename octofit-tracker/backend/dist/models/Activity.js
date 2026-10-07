import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    name: { type: String, required: true },
    duration: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    user: { type: String, default: '' },
});
const Activity = model('Activity', activitySchema);
export default Activity;
