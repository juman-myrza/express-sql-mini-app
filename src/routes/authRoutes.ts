import { Router } from 'express'
import AuthController from '../controllers/authController'
import authMiddleware from '../middleware/auth.middleware'
import { Routes } from '../interfaces/route.interface'

class AuthRoute implements Routes {
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`/signup`, this.authController.signUp)
    this.router.post(`/signin`, this.authController.signIn)
    this.router.post(`/signin/new_token`, this.authController.refreshToken)
    this.router.get(`/info`, authMiddleware, this.authController.getProfile)
    this.router.get(`/logout`, authMiddleware, this.authController.logout)
  }
}

export default AuthRoute
