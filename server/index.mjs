// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures,JSVoidFunctionReturnValueUsed,JSUnresolvedVariable

import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'

import { router } from './routes/index.mjs'
import { config } from 'dotenv'

import db from './models/index.mjs'

config()

const app = express()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env
const { NODE_DOCKER_PORT: PORT = 8080 } = process.env

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:8081'
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 50000
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

app.use(router)

db.mongoose.connect(connection(), {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
  console.log('Successfully connect to MongoDB')
  initial()
})
.catch(err => {
  console.error('Connection error', err)
  process.exit()
})


const server = app.listen(PORT, () => {
  console.log('Server started on port: %s', server.address().port)
})

const Role = db.role

function initial()
{
  Role.estimatedDocumentCount((err, count) => {
    if (err || count > 0) return

    new Role({ name: 'student' })
      .save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("Added 'student' to roles collection")
      })

    new Role({ name: 'teacher' })
      .save(err => {
        if (err) {
          console.log('error', err)
        }

        console.log("Added 'teacher' to roles collection")
      })
  })
}

/**
* `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
*/
function connection()
{
  let url = `mongodb://`

  if (DB_USER && DB_HOST) {
    url += `${DB_USER}:${DB_PASSWORD}@`
  }

  url += `${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

  return url
}
