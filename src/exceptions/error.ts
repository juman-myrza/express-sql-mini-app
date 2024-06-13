export abstract class CustomError extends Error {
  public name: string
  public status: number

  constructor(name: string, message: string, status: number) {
    super(message)

    this.name = name
    this.status = status
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'User is not authorized.', status: number = 401) {
    super('UnauthorizedException', message, status)
  }
}

export class BadRequestException extends CustomError {
  constructor(message: string, status: number = 400) {
    super('BadRequestException', message, status)
  }
}

export class InternalErrorException extends CustomError {
  constructor(message: string = 'Internal server error.', status: number = 500) {
    super('InternalErrortException', message, status)
  }
}

export class NotFoundException extends CustomError {
  constructor(message: string = 'Resource not found.', status: number = 404) {
    super('NotFoundException', message, status)
  }
}

export class ValidationException extends CustomError {
  constructor(message: string, status: number = 404) {
    super('ValidationException', message, status)
  }
}
