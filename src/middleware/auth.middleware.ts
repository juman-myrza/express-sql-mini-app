import { NextFunction, Response } from 'express'
import { BadRequestException, UnauthorizedError } from '../exceptions/errors'
import TokenService from '../services/token.service'

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const tokenService = new TokenService()
  try {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
      throw new UnauthorizedError()
    }

    const accessToken = authorizationHeader.split('Bearer ')[1]

    if (!accessToken) {
      throw new UnauthorizedError()
    }

    const userData: any = tokenService.validateAccessToken(accessToken)

    if (!userData) {
      throw new BadRequestException('Invalid token provided.')
    }

    req.userId = userData.id
    next()
  } catch (error) {
    next(new UnauthorizedError())
  }
}

export default authMiddleware
