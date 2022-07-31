import e from 'express'
import account from '../controllers/account'

const router = e.Router()

router.get('/', (req, res) => res.json({ hello: 'apollo' }))

router.post('/account/signin', account.signIn)
router.post('/account/signup', account.signUp)

export default router
