const mongoose = require('mongoose')

const AlbumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  category: {
    type: String,
    required: true,
    unique: false
  },
  datetime: {
    type: Date,
    required: true,
    unique: false,
    default: Date.now
  },
  coverImgUrl: {
    type: String,
    required: true,
    unique: false
  },
  images: [{
    type: String,
    required: false,
    unique: false
  }],
  user: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Albums', AlbumSchema)
