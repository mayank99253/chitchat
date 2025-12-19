import express from 'express'
import { signup } from '../controller/auth.controller.js'

const router = express.Router()

router.post('/signup',signup) // api - let test it from postman
router.get('/login', (req, res) => {
  res.send('LOGIN')
})
router.get('/logout', (req, res) => {
  res.send('LOGOUT')
})

export default router