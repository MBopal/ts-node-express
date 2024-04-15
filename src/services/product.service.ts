import { logger } from '../utils/logger'
import productModel from '../models/product.model'

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
