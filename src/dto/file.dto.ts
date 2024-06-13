import { FileModel } from '../models/file.model'

export class CreateFileDto {
  public id!: number
  public name!: string
  public extension!: string
  public mimeType!: string
  public size!: number
  public uploadDate!: Date

  constructor(model: FileModel) {
    this.id = model.id
    this.name = model.name
    this.extension = model.extension
    this.mimeType = model.mimeType
    this.size = model.size
    this.uploadDate = model.uploadDate
  }
}
