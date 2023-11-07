const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required:true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  userName: String,
  userAvatar:String
}, {
  timestamps: true
})

const bookSchema = new Schema({
  userRecommending: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  title: {
    type: String,
    required:true
  },
  isbn: {
    type: String,
    required: true
  },
  userReading: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  }],
  comments:[commentSchema]

},
  {
  timestamps:true
})



module.exports = mongoose.model('Book', bookSchema);