const { Schema, model, Types } = require('mongoose');
const usersSchema = new Schema({
    name :{type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

module.exports = model('Users', usersSchema);