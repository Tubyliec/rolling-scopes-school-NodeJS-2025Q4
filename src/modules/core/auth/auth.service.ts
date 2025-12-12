import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new Error('User already exists');
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
      throw new NotFoundException('User not foundc');
    }
    const isPasswordValid = await bcrypt.compare(password, existUser.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return this.generateTokens(existUser.id);
  }

  private async generateTokens(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { id: true, login: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      userId: user.id,
      login: user.login,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.JWT_SECRET_KEY,
      expiresIn: this.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(
      { ...payload, isRefreshToken: true },
      {
        secret: this.JWT_SECRET_REFRESH_KEY,
        expiresIn: this.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}