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

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService<User>) {}

  public async getAllUsers(): Promise<User[]> {
    return this.databaseService.getAllItems();
  }

  public async getUser(id: string): Promise<User> {
    const user: User = this.databaseService.getItem(id);
    console.log(user);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  public async createUser(userRequest: CreateUserDto): Promise<User> {
    const user = {
      ...userRequest,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return this.databaseService.createItem(user);
  }

  public async updateUser(
    id: string,
    updateRequest: UpdatePasswordDto,
  ): Promise<User> {
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
    return this.databaseService.updateItem(id, updatedUser);
  }

  public async deleteUser(id: string): Promise<boolean> {
    const isUserDeleted = this.databaseService.deleteItem(id);
    if (!isUserDeleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return isUserDeleted;
  }
}