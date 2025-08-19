const { Schema, model, Types } = require('mongoose');
const lessonsSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    
});