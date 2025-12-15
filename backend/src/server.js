import express from 'express'
// const express = require('express')
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use('/api/auth/',authRoute)
app.use('/api/messages/',messageRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
