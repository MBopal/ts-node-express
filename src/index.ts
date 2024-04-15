import type { Application, Request, Response, NextFunction } from 'express'
import express from 'express'

const app: Application = express()
const port: number = 3000

// app.use(express.json());

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 200
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
