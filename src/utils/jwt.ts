import jwt from 'jsonwebtoken'
import CONFIG from '../config/environment'

export const signJWT = (payload: object) => {
  return jwt.sign(payload, CONFIG.jwt_private, {
    algorithm: 'RS256',
    expiresIn: '1d'
  })
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, CONFIG.jwt_public)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (err: any) {
    console.log('Error:', err.message)
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null
    }
  }
}
