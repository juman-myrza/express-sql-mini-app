import { Sequelize } from 'sequelize'
import UserModel from '../models/user.model'
import TokenModel from '../models/token.model'
import FileModel from '../models/file.model'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config'

const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
  host: DB_HOST!,
  dialect: 'mysql',
})

const DB = {
  Users: UserModel(sequelize),
  Token: TokenModel(sequelize),
  Files: FileModel(sequelize),
  sequelize,
  Sequelize,
}

export default DB
