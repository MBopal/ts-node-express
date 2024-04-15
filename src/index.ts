import type { Application } from 'express'
import express from 'express'
import { routes } from './routes'

const app: Application = express()
const port: number = 3000

// app.use(express.json());

routes(app)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
