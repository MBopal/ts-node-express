import { NextFunction, Request, Response } from 'express'
import { verifyJWT } from '../utils/jwt'

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '')
  if (!accessToken) return next()

  const { decoded, expired } = verifyJWT(accessToken)

  if (decoded) {
    res.locals.user = decoded
    return next()
  }

  if (expired) return res.status(401).json({ status: false, statusCode: 401, message: 'Token expired' })

  return next()
}

export default deserializedToken
