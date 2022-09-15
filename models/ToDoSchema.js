const { Schema, model } = require('mongoose')

const ToDoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  id_user: {
    type: String,
    required: true,
  }
})

module.exports = model('ToDoSchema', ToDoSchema);