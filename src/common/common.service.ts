import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../core/orm/prisma.service';
import { EDbField, EDynamicallyAction } from '../core/enum';

@Injectable()
export class CommonService {
  constructor(private readonly prismaService: PrismaService) {}

  public async checkIfUserExists(
    actionWithFoundField: EDynamicallyAction,
    email: string,
    dbField: EDbField,
  ): Promise<User> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        [dbField]: email,
      },
    });

    switch (actionWithFoundField) {
      case EDynamicallyAction.NEXT:
        if (!foundUser) {
          throw new HttpException('User not found', 400);
        }
        return foundUser;
      case EDynamicallyAction.THROW:
        if (foundUser) {
          throw new HttpException('User already exists', 400);
        }
        break;
    }
  }
}
