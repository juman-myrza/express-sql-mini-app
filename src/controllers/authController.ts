import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import DB from '../config/database'
import AuthService from '../services/auth.service'

export default class AuthController {
  public authService = new AuthService()

  public signUp = async (req: Request, res: Response) => {
    try {
      const userData = await this.authService.signUp(req.body)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.status(201).json(userData)
    } catch (err) {
      res.status(500).json({ error: (err as Error).message })
    }
  }

  public signIn = async (req: Request, res: Response) => {
    try {
      const { id, password } = req.body
      const userData = await this.authService.signIn(id, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.status(200).json(userData)
    } catch (err) {
      res.status(500).json({ error: (err as Error).message })
    }
  }

  public logout = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies
      const token = this.authService.logout(refreshToken)
      res.clearCookie('refreshToken')

      return res.json(token)
    } catch (err) {
      res.status(500).json({ error: (err as Error).message })
    }
  }

  public refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies
      const userData = await this.authService.refreshToken(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.status(200).json(userData)
    } catch (err) {
      res.status(500).json({ error: (err as Error).message })
    }
  }

  public getProfile = async (req: Request, res: Response) => {
    try {
      const userData = await this.authService.getProfile((req as any).userId)

      return res.status(200).json(userData)
    } catch (err) {
      res.status(500).json({ error: (err as Error).message })
    }
  }
}
