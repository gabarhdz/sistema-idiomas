const { Schema, model, Types } = require('mongoose');
const lessonsSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    language: {type: String, required: true},
    level: {type: Number, required: true},
    user: {type: Types.ObjectId, ref: 'Users', required: true},
    exercises: [{type: Types.ObjectId, ref: 'Exercise', required: true}],
});
module.exports = model('Lesson', lessonsSchema);