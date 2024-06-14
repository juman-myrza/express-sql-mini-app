import path from 'path'
import DB from '../config/database'
import * as fs from 'fs/promises'
import { NotFoundException } from '../exceptions/errors'

export default class FileService {
  public files = DB.Files

  public async uploadFile(file: Express.Multer.File) {
    const extension = file.mimetype.split('/')[1]
    const uploadDate = new Date()
    const name = `${uploadDate.getTime()}-${file.originalname}`
    const uploadPath = path.join(__dirname, '../', '../uploads', name)

    const fileData = {
      name,
      extension,
      mimeType: file.mimetype,
      size: file.size,
      uploadDate: new Date(),
    }
    const [_, fileRecord] = await Promise.all([fs.writeFile(uploadPath, file.buffer), this.files.create(fileData)])

    return fileRecord
  }

  public async listFiles(query: { offset: number; limit: number }) {
    const listFiles = await this.files.findAll({ offset: query.offset, limit: query.limit })

    if (listFiles.length === 0) throw new NotFoundException('No files found')

    return listFiles
  }

  public async deleteFile(id: string) {
    const file = await this.files.findOne({ where: { id } })

    if (!file) throw new NotFoundException(`File with id ${id} does not exist`)

    await Promise.all([
      fs.unlink(path.join(__dirname, '../', '../uploads', file.name)),
      this.files.destroy({ where: { id } }),
    ])
  }

  public async getFile(id: string) {
    const fileRecord = await this.files.findByPk(id)

    if (!fileRecord) throw new NotFoundException()

    return fileRecord
  }

  public async updateFile(id: string, file: Express.Multer.File) {
    const oldFile = await this.files.findByPk(id)

    if (!oldFile) throw new NotFoundException(`File with id ${id} does not exist`)

    const updatedDate = new Date()
    const newFileName = `${updatedDate.getTime()}-${file.originalname}`
    const oldFilePath = path.join(__dirname, '../', '../uploads', oldFile.name)
    const newFilePath = path.join(__dirname, '../', '../uploads', newFileName)
    const fileData = {
      name: newFileName,
      extension: file.mimetype.split('/')[1],
      mimeType: file.mimetype,
      size: file.size,
      updatedDate,
    }

    await Promise.all([
      fs.unlink(oldFilePath),
      fs.writeFile(newFilePath, file.buffer),
      this.files.update(fileData, { where: { id } }),
    ])

    return fileData
  }
}
