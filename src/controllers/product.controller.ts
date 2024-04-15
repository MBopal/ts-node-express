import type { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { addProductToDB, getProductById, getProductFromDB, updateProductById } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'
import ProductType from '../types/product.type'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const createRequest = createProductValidation(req.body as ProductType)
  if (!createRequest.success) {
    logger.error(`ERR: product - create = ${createRequest.error.errors[0].message}`)
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: createRequest.error.errors[0].message
    })
  }

  try {
    await addProductToDB(createRequest.data as ProductType)
    logger.info('Success create new product')
    res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'Success create new product'
    })
  } catch (err) {
    logger.error('ERR: product - create = ', err)
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: err
    })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  if (id) {
    const product: any = await getProductById(id)
    if (product) {
      logger.info('Success get product data')
      return res.status(200).json({
        status: true,
        statusCode: 200,
        data: product
      })
    } else {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: 'Product not found'
      })
    }
  } else {
    const products: any = await getProductFromDB()
    logger.info('Success get product data')
    return res.status(200).json({
      status: true,
      statusCode: 200,
      data: products
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  const updateRequest = updateProductValidation(req.body as ProductType)
  if (!updateRequest.success) {
    logger.error(`ERR: product - create = ${updateRequest.error.errors[0].message}`)
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: updateRequest.error.errors[0].message
    })
  }

  try {
    await updateProductById(id, updateRequest.data as ProductType)
    logger.info('Success update product')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Success update product'
    })
  } catch (err) {}
}
