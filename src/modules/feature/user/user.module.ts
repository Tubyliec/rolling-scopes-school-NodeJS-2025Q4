import { Module } from '@nestjs/common';

import { UUIDValidationPipe } from '../../shared/validators/uuid-validation.pipe';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UUIDValidationPipe],
  controllers: [UserController],
})
export class UserModule {}