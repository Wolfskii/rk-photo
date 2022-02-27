const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 6
  },
  date: {
    type: Date,
    required: true,
    unique: false,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
