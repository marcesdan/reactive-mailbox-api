import mongoose from 'mongoose'
import mailSeeder from '../database/seeders/mailSeeder'

//Set up mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017/homestead?gssapiServiceName=mongodb'
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise

export const databaseSeeder = () => {
  // connection to mongodb
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
  mailSeeder().then(() => console.log('Mail seeding was successful!'))
}
