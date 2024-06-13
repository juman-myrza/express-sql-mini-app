import { Model, DataTypes, Sequelize } from 'sequelize'
import { User } from '../interfaces/user.interface'

export class UserModel extends Model<User> implements User {
  public id!: string
  public password!: string
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  )

  return UserModel
}
