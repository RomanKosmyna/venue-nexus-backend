import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokenService } from '../token';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Injectable()
export class CronService {
  constructor(private readonly tokenService: TokenService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeExpiredTokenPair(): Promise<void> {
    const threshold = dayjs().utc().subtract(35, 'minutes').toDate();

    return this.tokenService.deleteManyByDate(threshold);
  }
}
