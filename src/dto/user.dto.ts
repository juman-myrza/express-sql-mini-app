import { User } from './../interfaces/user.interface'
import { IsString, IsEmail } from 'class-validator'

export class CreateUserDto {
  public id!: string
  public password!: string

  constructor(model: User) {
    this.id = model.id
    this.password = model.password
  }
}
