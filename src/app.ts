import dotenv from 'dotenv'
import e from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router/router'

dotenv.config()

const app = e()

mongoose
  .connect(process.env.MONGO as string)
  .then(() => app.emit('db'))
  .catch((e) => console.log('Mongoose connect error', e.message))

app.use(e.urlencoded({ extended: true }))
app.use(e.json())
app.use(cors())

app.use(router)

app.on('db', () =>
  app.listen(process.env.PORT, () =>
    console.log(`Server on: http://127.0.0.1:${process.env.PORT}`)
  )
)
