import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SessionSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v
      return ret
    }
  }
})

const Session = mongoose.model('Session', SessionSchema)
export default Session

export const getSession = id =>
  Session.findById(id)

export const saveSession = (email, callback) =>
  Session.create({email}, callback)

export const removeSession = id =>
  getSession(id).remove()


