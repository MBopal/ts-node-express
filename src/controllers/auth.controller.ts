import { Request, Response } from 'express'
import { createUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import UserType from '../types/user.type'
import { hash } from '../utils/hash'
import { createUser } from '../services/auth.service'

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  const registerRequest = createUserValidation(req.body as UserType)
  if (!registerRequest.success) {
    logger.error(`ERR: auth - register = ${registerRequest.error.errors[0].message}`)
    return res.status(400).json(registerRequest.error.errors[0].message)
  }

  try {
    registerRequest.data.password = hash(registerRequest.data.password as string)

    await createUser(registerRequest.data as UserType)
    return res.status(201).json({ status: true, statusCode: 201, message: 'User registered successfully' })
  } catch (err: any) {
    logger.error(`ERR: auth - register = ${err}`)
    return res.status(422).json({ status: false, statusCode: 422, message: err.errmsg })
  }
}
