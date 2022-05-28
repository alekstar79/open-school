import mongoose from 'mongoose'

export default mongoose.model(
  'User',

  new mongoose.Schema({
    username: String,
    password: String,
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  })
)
