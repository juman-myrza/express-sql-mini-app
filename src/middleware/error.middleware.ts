import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../exceptions/errors'

const errorMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message })
  }

  return res.status(500).json({ message: 'Something went wrong.' })
}

export default errorMiddleware
