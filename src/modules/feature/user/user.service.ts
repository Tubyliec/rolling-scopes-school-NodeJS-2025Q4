import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { v4 } from 'uuid';

import { PrismaService } from '../../core/prisma/prisma.service';

import { CreateUserDto } from './models/dto/create-user.dto';
import { ResponseUserDto } from './models/dto/response-user.dto';
import { UpdatePasswordDto } from './models/dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async getAllUsers(): Promise<ResponseUserDto[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => {
      const userWithTimestamps = {
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
      return plainToInstance(ResponseUserDto, userWithTimestamps);
    });
  }

  public async getUser(id: string): Promise<ResponseUserDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const userWithTimestamps = {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
    return plainToInstance(ResponseUserDto, userWithTimestamps);
  }

  public async createUser(
    userRequest: CreateUserDto,
  ): Promise<ResponseUserDto> {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        login: userRequest.login,
      },
    });

    if (existingUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User with this login already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    const createdUser = await this.prismaService.user.create({
      data: {
        ...userRequest,
        id: v4(),
        version: 1,
      },
    });
    const userWithTimestamps = {
      ...createdUser,
      createdAt: createdUser.createdAt.getTime(),
      updatedAt: createdUser.updatedAt.getTime(),
    };
    return plainToInstance(ResponseUserDto, userWithTimestamps);
  }

  public async updateUser(
    id: string,
    updateRequest: UpdatePasswordDto,
  ): Promise<ResponseUserDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (user.password !== updateRequest.oldPassword) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'The old password you is not matched with the user password',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUserResult = await this.prismaService.user.update({
      where: { id },
      data: {
        password: updateRequest.newPassword,
        version: user.version + 1,
      },
    });
    const userWithTimestamps = {
      ...updatedUserResult,
      createdAt: updatedUserResult.createdAt.getTime(),
      updatedAt: updatedUserResult.updatedAt.getTime(),
    };
    return plainToInstance(ResponseUserDto, userWithTimestamps);
  }

  public async deleteUser(id: string) {
    const user = await this.getUser(id);
    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    return this.prismaService.user.delete({ where: { id } });
  }
}