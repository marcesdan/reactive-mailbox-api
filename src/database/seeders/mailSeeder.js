import mail from '../../models/mail'
import data from './MOCK_DATA.json'

export default async () => {
  await mail.remove({})
  return mail.insertMany(data)
}


