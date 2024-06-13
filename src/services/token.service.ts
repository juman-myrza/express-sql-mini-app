import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config/config'
import { User } from '../interfaces/user.interface'
import DB from '../config/database'

export default class TokenService {
  public token = DB.Token

  generateTokens(payload: User) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET!, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET!, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.token.findOne({ where: { userId } })

    if (tokenData) {
      tokenData.refreshToken = refreshToken

      return tokenData.save()
    }

    const token = await this.token.create({ userId, refreshToken })

    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.token.destroy({ where: { refreshToken } })

    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData = await this.token.findOne({ where: { refreshToken } })

    return tokenData
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET!)

      return userData
    } catch (error) {
      return null
    }
  }
  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, JWT_REFRESH_SECRET!)

      return userData
    } catch (error) {
      return null
    }
  }
}
