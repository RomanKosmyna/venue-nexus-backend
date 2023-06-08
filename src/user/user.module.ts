import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../core/orm/prisma.module';
import { UserService } from './user.service';
import { CommonModule } from '../common/common.module';
import { PasswordModule } from '../password/password.module';
import { CommonService } from '../common/common.service';
import { PasswordService } from '../password/password.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, CommonService, PasswordService, JwtService],
  imports: [PrismaModule, CommonModule, PasswordModule, JwtModule],
  controllers: [UserController],
})
export class UserModule {}
