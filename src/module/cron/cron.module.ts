import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { TokenModule, TokenService } from '../token';

@Module({
  imports: [TokenModule],
  providers: [CronService, TokenService],
})
export class CronModule {}
