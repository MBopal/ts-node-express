import type { NextFunction, Request, Response } from 'express'
import { Router } from 'express'
import { logger } from '../utils/logger'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get product data')
  res.status(200).json({
    status: true,
    statusCode: 200,
    data: [
      {
        name: 'Sepatu Sport',
        price: 500000
      }
    ]
  })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success create new product')
  res.status(200).json({
    status: true,
    statusCode: 200,
    data: req.body
  })
})
