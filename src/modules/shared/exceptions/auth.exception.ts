import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid credentials', HttpStatus.FORBIDDEN);
  }
}

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User with this login already exists', HttpStatus.BAD_REQUEST);
  }
}

export class InvalidTokenException extends HttpException {
  constructor() {
    super('Invalid or expired token', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidRefreshTokenException extends HttpException {
  constructor() {
    super('Invalid or expired refresh token', HttpStatus.FORBIDDEN);
  }
}
