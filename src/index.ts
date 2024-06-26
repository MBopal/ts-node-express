import type { Application } from 'express'
import cors from 'cors'
import express from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'
import './utils/db'
import deserializedToken from './middlewares/deserializedToken'

const app: Application = express()
const port: number = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
app.use(deserializedToken)

routes(app)

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})
