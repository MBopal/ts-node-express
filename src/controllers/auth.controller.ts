import { Request, Response } from 'express'
import { createSessionValidation, createUserValidation, refreshSessionValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import UserType from '../types/user.type'
import { checkPassword, hash } from '../utils/hash'
import { createUser, findUserByEmail } from '../services/auth.service'
import { signJWT, verifyJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  const registerRequest = createUserValidation(req.body as UserType)
  if (!registerRequest.success) {
    logger.error(`ERR: auth - register = ${registerRequest.error.errors[0].message}`)
    return res.status(400).json({ status: false, statusCode: 400, message: registerRequest.error.errors[0].message })
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

export const createSession = async (req: Request, res: Response) => {
  const sessionRequest = createSessionValidation(req.body as UserType)

  if (!sessionRequest.success) {
    logger.error(`ERR: auth - session = ${sessionRequest.error.errors[0].message}`)
    return res.status(400).json({ status: false, statusCode: 400, message: sessionRequest.error.errors[0].message })
  }

  try {
    const user: any = await findUserByEmail(sessionRequest.data.email as string)
    const isValid = checkPassword(sessionRequest.data.password as string, user.password as string)

    if (!isValid) return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid credentials' })

    const accessToken = signJWT({ ...user })

    const refreshToken = signJWT({ ...user })

    return res
      .status(200)
      .json({
        status: true,
        statusCode: 200,
        message: 'User logged in successfully',
        data: { accessToken, refreshToken }
      })
  } catch (err: any) {
    logger.error(`ERR: auth - session = ${err}`)
    return res.status(404).json({ status: false, statusCode: 404, message: 'User not found' })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const request = refreshSessionValidation(req.body)
  if (!request.success) {
    logger.error(`ERR: auth - refresh = ${request.error.errors[0].message}`)
    return res.status(400).json({ status: false, statusCode: 400, message: request.error.errors[0].message })
  }

  try {
    const { decoded }: any = verifyJWT(request.data.refreshToken)

    const user = await findUserByEmail(decoded._doc.email)
    if (!user) return false

    const accessToken = signJWT({ ...user })

    return res
      .status(200)
      .json({ status: true, statusCode: 200, message: 'Token refreshed successfully', data: { accessToken } })
  } catch (error: any) {
    logger.error(`ERR: auth - refresh = ${error}`)
    return res.status(401).json({ status: false, statusCode: 401, message: 'Token expired' })
  }
}
