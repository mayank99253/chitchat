import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieparser from 'cookie-parser'

import cors from 'cors'
import authRoute from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './lib/db.js'
import { ENV } from './lib/env.js'
import { app, server } from './lib/socket.js'

const __dirname = path.resolve()

const PORT = ENV.PORT || 3000;

app.use(express.json({limit:"5mb"})); // req.body

app.use(cookieparser())

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }))

app.use('/api/auth/', authRoute)
app.use('/api/messages/', messageRoutes)

//make ready for deployment

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
  })
}

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  connectDB();
})
