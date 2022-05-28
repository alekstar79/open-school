import mongoose from 'mongoose'

export default mongoose.model(
  'Lesson',

  new mongoose.Schema({
    image: String,
    theme: String,
    name: String,
    text: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })
)
