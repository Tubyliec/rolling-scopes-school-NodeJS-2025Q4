import { Module } from '@nestjs/common';

import { UUIDValidationPipe } from '../../shared/validators/uuid-validation.pipe';
import { DatabaseModule } from '../database/database.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UUIDValidationPipe],
  controllers: [UserController],
  imports: [DatabaseModule],
})
export class UserModule {}
