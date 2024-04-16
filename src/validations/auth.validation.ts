import { ZodType, z } from 'zod'
import UserType from '../types/user.type'

export const createUserValidation = (payload: UserType) => {
  const schema: ZodType = z.object({
    user_id: z.string({ required_error: 'user_id is required' }).uuid(),
    email: z.string({ required_error: 'email is required' }).email(),
    name: z.string({ required_error: 'name is required' }).min(3).max(255).optional(),
    password: z.string({ required_error: 'password is required' }).min(5).max(255),
    role: z.string().optional()
  })

  return schema.safeParse(payload)
}

export const createSessionValidation = (payload: UserType) => {
  const schema: ZodType = z.object({
    email: z.string({ required_error: 'email is required' }).email(),
    password: z.string({ required_error: 'password is required' }).min(5).max(255)
  })

  return schema.safeParse(payload)
}
