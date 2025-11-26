import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { UUIDValidationPipe } from '../../shared/validators/uuid-validation.pipe';

@Module({
  providers: [UserService, UUIDValidationPipe],
  controllers: [UserController],
  imports: [DatabaseModule],
})
export class UserModule {}