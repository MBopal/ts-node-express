import { NextFunction, Request, Response } from 'express'

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user) return res.status(401).json({ status: false, statusCode: 401, message: 'Unauthorized' })

  return next()
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user || user._doc.role !== 'admin') {
    return res.status(401).json({ status: false, statusCode: 401, message: 'Unauthorized' })
  }

  return next()
}
