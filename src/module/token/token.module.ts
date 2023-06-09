import { Global, Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PrismaModule} from "../../core/orm/prisma.module";

@Global()
@Module({
  imports: [JwtModule, PrismaModule],
  controllers: [TokenController],
  providers: [TokenService, JwtService],
})
export class TokenModule {}
