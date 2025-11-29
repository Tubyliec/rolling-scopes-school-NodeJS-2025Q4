import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UserService } from './user.service';
import { ResponseUserDto } from './models/dto/response-user.dto';
import { UUIDValidationPipe } from '../../shared/validators/uuid-validation.pipe';
import { UpdatePasswordDto } from './models/dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<ResponseUserDto[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): Promise<ResponseUserDto> | undefined {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() userRequest: CreateUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.createUser(userRequest);
  }

  @Put(':id')
  async updateUser(
    @Param('id', UUIDValidationPipe)
    id: string,
    @Body() updateRequest: UpdatePasswordDto,
  ): Promise<ResponseUserDto> {
    return this.userService.updateUser(id, updateRequest);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
