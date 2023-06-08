import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../core/orm/prisma.service';
import CreateUserDto from './dto/user.dto';
import { CommonService } from '../common/common.service';
import { PasswordService } from '../password/password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const { email } = userData;
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw new Error('Email address already exists');
    }

    const password = userData.password;
    const hashedPassword = await this.passwordService.hash(password);

    return await this.prismaService.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      },
    });
  }
}
