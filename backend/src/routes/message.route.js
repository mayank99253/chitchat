import express from 'express'

const router = express.Router()

router.get('/send', (req, res) => {
  res.send('SEND ENDPOINT')
})
router.get('/receive', (req, res) => {
  res.send('RECEIVE ENDPOINT')
})
export default router