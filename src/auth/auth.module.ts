import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';
import { PasswordModule } from '../password/password.module';
import { UserService } from '../user';
import { CommonService } from '../common/common.service';
import { PasswordService } from '../password/password.service';
import { AuthController } from './auth.controller';
import { TokenModule, TokenService } from '../token';

@Global()
@Module({
  providers: [
    AuthService,
    UserService,
    CommonService,
    PasswordService,
    TokenService,
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    }),
    UserModule,
    CommonModule,
    PasswordModule,
    TokenModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
