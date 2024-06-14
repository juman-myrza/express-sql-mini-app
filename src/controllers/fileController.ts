import { Request, Response } from 'express'
import FileService from '../services/file.service'
import { CustomError, NotFoundException, ValidationException } from '../exceptions/errors'
import path from 'path'
import { getPagination } from '../utils/pagination'

export default class FileController {
  public fileService = new FileService()

  public uploadFile = async (req: Request, res: Response) => {
    try {
      const { file } = req

      const fileData = await this.fileService.uploadFile(file!)

      return res.status(201).json(fileData)
    } catch (err) {
      res.status((err as CustomError).status).json({ error: (err as Error).message })
    }
  }

  public listFiles = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1
      const size = Number(req.query.list_size) || 10
      const query = getPagination(page, size)

      const fileList = await this.fileService.listFiles(query)

      return res.status(200).json(fileList)
    } catch (err) {
      res.status((err as CustomError).status).json({ error: (err as Error).message })
    }
  }

  public deleteFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await this.fileService.deleteFile(id)

      return res.status(204)
    } catch (err) {
      res.status((err as CustomError).status).json({ error: (err as Error).message })
    }
  }

  public getFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const fileData = await this.fileService.getFile(id)

      return res.status(200).json(fileData)
    } catch (err) {
      res.status((err as CustomError).status).json({ error: (err as Error).message })
    }
  }

  public downloadFile = async (req: Request, res: Response) => {
    try {
      const file = await this.fileService.getFile(req.params.id)

      if (!file) throw new NotFoundException()

      const filePath = path.join(__dirname, '../', '../uploads', file.name)

      res.download(filePath, file.name, (err) => {
        if (err) throw err

        console.log('File downloaded successfully.')
      })
    } catch (err) {
      res.status((err as CustomError).status).json({ error: (err as Error).message })
    }
  }

  public updateFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const file = req.file

      if (!file) throw new ValidationException('File is required.')

      const fileData = await this.fileService.updateFile(id, file)

      return res.status(200).json(fileData)
    } catch (err) {
      res.status((err as CustomError).status).json({ error: (err as Error).message })
    }
  }
}
