import type { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { ProductInterface, createProductValidation } from '../validations/product.validation'
import { getProductFromDB } from '../services/product.service'

interface ProductType {
  productId: string
  name: string
  price: number
  size: string
}

export const createProduct = (req: Request, res: Response) => {
  const createRequest = createProductValidation(req.body as ProductInterface)
  if (!createRequest.success) {
    logger.error(`ERR: product - create = ${createRequest.error.errors[0].message}`)
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: createRequest.error.errors[0].message
    })
  }

  logger.info('Success create new product')
  res.status(200).json({
    status: true,
    statusCode: 200,
    message: 'Success create new product',
    data: createRequest.data
  })
}

export const getProduct = (req: Request, res: Response) => {
  const products: any = getProductFromDB()

  const { name } = req.params

  const filteredProducts = name
    ? products.filter((product: ProductType) => product.name.toLowerCase() === name.trim().toLowerCase())
    : undefined

  if (filteredProducts?.length === 0) {
    logger.info('Product not found')
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: 'Product not found'
    })
  }

  logger.info('Success get product data')
  res.status(200).json({
    status: true,
    statusCode: 200,
    data: filteredProducts?.at(0) ?? products
  })
}
