import { Router } from 'express'
import authMiddleware from '../middleware/auth.middleware'
import { Routes } from '../interfaces/route.interface'
import FileController from '../controllers/fileController'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

export default class FileRoute implements Routes {
  public path = '/file'
  public router = Router()
  public fileController = new FileController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`, authMiddleware, upload.single('file'), this.fileController.uploadFile)
    this.router.get(`${this.path}/list`, authMiddleware, this.fileController.listFiles)
    this.router.get(`${this.path}/:id`, authMiddleware, this.fileController.getFile)
    this.router.get(`${this.path}/download/:id`, authMiddleware, this.fileController.downloadFile)
    this.router.put(`${this.path}/update/:id`, authMiddleware, upload.single('file'), this.fileController.updateFile)
    this.router.delete(`${this.path}/delete/:id`, authMiddleware, this.fileController.deleteFile)
  }
}
