import { ZodType, z } from 'zod'

export interface ProductInterface {
  name: string
  price: number
}

export const createProductValidation = (payload: ProductInterface) => {
  const schema: ZodType = z.object({
    name: z.string({ required_error: 'name is required' }).min(3).max(255),
    price: z.number().positive().optional()
  })

  return schema.safeParse(payload)
}
