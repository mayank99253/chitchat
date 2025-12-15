import express from 'express'

const router = express.Router()

router.get('/signup', (req, res) => {
  res.send('SIGNUP')
})
router.get('/login', (req, res) => {
  res.send('LOGIN')
})
router.get('/logout', (req, res) => {
  res.send('LOGOUT')
})

export default router