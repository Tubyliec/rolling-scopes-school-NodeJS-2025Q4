import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  InvalidCredentialsException,
  UserAlreadyExistsException,
} from '../../shared/exceptions/auth.exception';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../feature/user/models/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly CRYPT_SALT: string;
  private readonly JWT_SECRET_KEY: string;
  private readonly JWT_SECRET_REFRESH_KEY: string;
  private readonly TOKEN_EXPIRE_TIME: number;
  private readonly TOKEN_REFRESH_EXPIRE_TIME: number;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.CRYPT_SALT = configService.get<string>('CRYPT_SALT');
    this.JWT_SECRET_KEY = configService.get<string>('JWT_SECRET_KEY');
    this.JWT_SECRET_REFRESH_KEY = configService.get<string>(
      'JWT_SECRET_REFRESH_KEY',
    );
    this.TOKEN_EXPIRE_TIME = this.configService.getOrThrow('TOKEN_EXPIRE_TIME');
    this.TOKEN_REFRESH_EXPIRE_TIME = this.configService.getOrThrow(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
  }

  public async signUp(signUpRequest: CreateUserDto) {
    const { login, password } = signUpRequest;
    const existUser = await this.prismaService.user.findUnique({
      where: {
        login,
      },
    });
    if (existUser) {
      throw new UserAlreadyExistsException();
    }
    const hashedPassword = await bcrypt.hash(password, Number(this.CRYPT_SALT));
    const newUser = await this.prismaService.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });
    return this.generateTokens(newUser.id);
  }

  public async login(loginRequest: CreateUserDto) {
    const { login, password } = loginRequest;
    const existUser = await this.prismaService.user.findUnique({
      where: {
        login,
      },
    });
    if (!existUser) {
      throw new InvalidCredentialsException();
    }
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }
    return this.generateTokens(existUser.id);
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      });

      if (!payload.isRefreshToken) {
        throw new ForbiddenException('Invalid token type');
      }

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }
      return this.generateTokens(user);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException('Refresh token expired');
      }
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  private async generateTokens(user: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId: user.id,
          login: user.login,
          isRefreshToken: false,
        },
        {
          secret: this.configService.get('JWT_SECRET_KEY'),
          expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          userId: user.id,
          login: user.login,
          isRefreshToken: true,
        },
        {
          secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
          expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
