import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './models/dto/create-user.dto';
import { v4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { User } from './models/interfaces/user.interface';
import { UpdatePasswordDto } from './models/dto/update-password.dto';
import { ResponseUserDto } from './models/dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService<User>) {}

  public async getAllUsers(): Promise<ResponseUserDto[]> {
    const users = this.databaseService.getAllItems();
    return users.map((user) => plainToInstance(ResponseUserDto, user));
  }

  public async getUser(id: string): Promise<ResponseUserDto> {
    const user: User = this.databaseService.getItem(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToInstance(ResponseUserDto, user);
  }

  public async createUser(
    userRequest: CreateUserDto,
  ): Promise<ResponseUserDto> {
    const user = {
      ...userRequest,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdUser = this.databaseService.createItem(user);
    return plainToInstance(ResponseUserDto, createdUser);
  }

  public async updateUser(
    id: string,
    updateRequest: UpdatePasswordDto,
  ): Promise<ResponseUserDto> {
    const user = this.databaseService.getItem(id);
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

    const updatedUser = {
      ...user,
      password: updateRequest.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    const updatedUserResult = this.databaseService.updateItem(id, updatedUser);
    return plainToInstance(ResponseUserDto, updatedUserResult);
  }

  public async deleteUser(id: string): Promise<boolean> {
    const isUserDeleted = this.databaseService.deleteItem(id);
    if (!isUserDeleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return isUserDeleted;
  }
}
