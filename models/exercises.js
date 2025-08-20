const { Schema, model, Types } = require('mongoose');
const exercisesSchema = new Schema({
  title: { type: String, required: true },
  instruction: { type: String, required: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  options: [{ type: String, required: true }], 
  answer: { 
    type: Number, 
    required: true,
    validate: {
      validator: function(v) {
        return v >= 0 && v < this.options.length;
      },
      message: props => `El índice ${props.value} no es válido`
    }
  }
});

module.exports = model('Exercise', exercisesSchema);