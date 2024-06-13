import bcrypt from 'bcrypt'
import DB from '../config/database'
import { CreateUserDto } from '../dto/user.dto'
import TokenService from './token.service'
import { Token } from '../interfaces/user.interface'

export default class AuthService {
  public users = DB.Users
  public tokenService = new TokenService()

  public async signUp(userData: CreateUserDto) {
    const { id, password } = userData

    const candidate = await this.users.findOne({ where: { id } })

    if (candidate) {
      throw new Error(`User with this id ${id} already exists`)
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.users.create({ id, password: hashedPassword })
    const userDto = new CreateUserDto(user)
    const tokens = this.tokenService.generateTokens({ ...userDto })

    await this.tokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  public async signIn(id: string, password: string) {
    const user = await this.users.findOne({ where: { id } })

    if (!user) {
      throw new Error(`User ${id} is not registered`)
    }

    const isPasswordsEqual = bcrypt.compare(password, user.password)

    if (!isPasswordsEqual) {
      throw new Error(`Invalid password provided`)
    }

    const userDto: CreateUserDto = new CreateUserDto(user)
    const tokens = this.tokenService.generateTokens({ ...userDto })

    await this.tokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  public async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken)

    return token
  }

  public async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('User is not authorized.')
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = this.tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw new Error('User is not authorized')
    }

    const user = await this.users.findByPk((userData as any).id)
    const userDto: CreateUserDto = new CreateUserDto(user!)
    const tokens = this.tokenService.generateTokens({ ...userDto })

    await this.tokenService.saveToken(user!.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }

  public async getProfile(id: string) {
    const user = await this.users.findOne({ where: { id } })

    return { id: user?.id }
  }
}
