const { Schema, model, Types } = require('mongoose');
const lessonsSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    user: {type: Types.ObjectId, ref: 'User', required: true},
    exercises: [{type: Types.ObjectId, ref: 'Exercise', required: true}],
});
module.exports = model('Lesson', lessonsSchema);