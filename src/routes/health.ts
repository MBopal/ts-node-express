import type { NextFunction, Request, Response } from 'express'
import { Router } from 'express'

export const HealthRouter: Router = Router()

HealthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 200
  })
})
