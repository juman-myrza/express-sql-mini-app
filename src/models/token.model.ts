import { Model, DataTypes, Sequelize } from 'sequelize'
import { Token } from '../interfaces/user.interface'

export class TokenModel extends Model<Token> implements Token {
  public userId!: string
  public refreshToken?: string
}

export default function (sequelize: Sequelize): typeof TokenModel {
  TokenModel.init(
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tokens',
    }
  )

  return TokenModel
}
