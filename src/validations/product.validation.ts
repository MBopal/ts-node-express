import { ZodType, z } from 'zod'
import ProductType from '../types/product.type'

export const createProductValidation = (payload: ProductType) => {
  const schema: ZodType = z.object({
    product_id: z.string({ required_error: 'product_id is required' }).uuid(),
    name: z.string({ required_error: 'name is required' }).min(3).max(255),
    price: z.number().positive().optional(),
    size: z.string().min(1).max(10).optional()
  })

  return schema.safeParse(payload)
}

export const updateProductValidation = (payload: ProductType) => {
  const schema: ZodType = z.object({
    name: z.string({ required_error: 'name is required' }).min(3).max(255).optional(),
    price: z.number().positive().optional(),
    size: z.string().min(1).max(10).optional()
  })

  return schema.safeParse(payload)
}
