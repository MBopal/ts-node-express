import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import ProductType from '../types/product.type'

export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload)
}

export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((products) => {
      return products
    })
    .catch((err) => {
      logger.error(err)
    })
}

export const getProductById = async (id: string) => {
  return await productModel
    .findOne({ product_id: id })
    .then((product) => {
      return product
    })
    .catch((err) => {
      logger.error(err)
    })
}

export const updateProductById = async (id: string, payload: ProductType) => {
  return await productModel.findOneAndUpdate({ product_id: id }, payload)
}
