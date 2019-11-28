import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {databaseSeeder} from './config/database'
import verifyAccessToken from './middlewares/verifyAccessToken'
import emails from './routes/emails'
import auth from './routes/auth'

const app = express()
app.set('secretKey', 'nodeRestApi') // jwt secret token
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(app.get('secretKey')))

databaseSeeder()

app.use(auth)
// private route
app.use('/emails', verifyAccessToken, emails)

app.get('/', (req, res) =>
  res.json({'title': 'An awesome fullstack javascript reactive mailbox!'})
)

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// handle errors
app.use((err, req, res, next) => {
  console.log(err)
  if (err.status === 404)
    res.status(404).json({message: 'Not found'})
  else
    res.status(500).json({message: 'Something looks wrong :( !!!'})
})

app.listen(3000, () => console.log('Node server listening on port 3000'))
