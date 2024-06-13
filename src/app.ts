import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { PORT } from './config/config'
import DB from './config/database'
import { Routes } from './interfaces/route.interface'
import errorMiddleware from './middleware/error.middleware'
import path from 'path'

class App {
  public app: express.Application
  public port: string | number

  constructor(routes: Routes[]) {
    this.app = express()
    this.port = PORT || 3000

    this.connectToDatabase()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`)
    })
  }

  private connectToDatabase() {
    try {
      DB.sequelize.sync({ alter: true })
    } catch (err) {
      console.error('Error with connection to database: ', err)
    }
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: '*', credentials: false }))
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.static(path.join(__dirname, '../', 'uploads')))
    this.app.use(errorMiddleware)
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router)
    })
  }
}

export default App
