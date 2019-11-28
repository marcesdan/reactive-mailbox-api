import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {saveSession} from '../models/session'

const harcodedEmail = 'test@getsirena.com'
const workFactor = 10
const harcodedPassword = bcrypt.hashSync('test', workFactor)
const cookieOptions = {
  maxAge: 86400,
  httpOnly: true,
  signed: true,
  // secret: app.get('')
  // secure: true
}

export default {
  authenticate: ({app, body}, res, next) => {
    const {email, password} = body
    if (verify(email, password)) {
      saveSession(email, (err, session) => {
        if (err) {
          res.status(403).send('Forbidden')
        }
        const signedToken = jwt.sign(
          {sid: session._id},
          app.get('secretKey'),
          {expiresIn: 86400}
        )
        res.cookie('token', signedToken, cookieOptions)
          .json({status: 'success', message: 'Login successful!', data: {user: {email}}})
          .status(200)
      })
    }
  }
}

const verify = (email, password) =>
  email === harcodedEmail && bcrypt.compareSync(password, harcodedPassword)


