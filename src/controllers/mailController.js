import mail from '../models/mail'

export default {
  index: (req, res, next) => {
    mail.find({}, (err, data) => {
      if (err) {
        next(err)
      } else {
        res.json({status: 'success', data})
      }
    })
  }
}
