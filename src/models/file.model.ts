import { Model, DataTypes, Sequelize } from 'sequelize'

export class FileModel extends Model {
  public id!: number
  public name!: string
  public extension!: string
  public mimeType!: string
  public size!: number
  public uploadDate!: Date
}

export default function (sequelize: Sequelize): typeof FileModel {
  FileModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      extension: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'files',
    }
  )
  return FileModel
}
