import express from 'express'
import emailsController from '../controllers/mailController'

const router = express.Router()

router.get('/', emailsController.index)

export default router
