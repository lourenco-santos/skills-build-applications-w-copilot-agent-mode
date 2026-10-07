import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true },
    difficulty: { type: String, default: 'easy' },
    duration: { type: Number, default: 0 },
});
const Workout = model('Workout', workoutSchema);
export default Workout;
