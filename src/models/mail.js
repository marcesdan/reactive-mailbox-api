import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MailSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  message: {
    type: String,
    trim: true,
    required: true
  },
  subject: {
    type: String,
    trim: true,
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v
      delete ret._id
      return ret
    }
  }
})

export default mongoose.model('Mail', MailSchema)
