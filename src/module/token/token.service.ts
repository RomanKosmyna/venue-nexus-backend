import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from '../../core/interface';
import { PrismaService } from '../../core/orm/prisma.service';
import { ITokenPair } from '../../core/interface';
import {Token} from "@prisma/client";

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async verifyToken(token): Promise<ITokenPayload> {
    const payload = (await this.jwtService.verifyAsync(token)) as ITokenPayload;

    if (!payload) {
      throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);
    }

    return payload;
  }

  public async createTokenPair(payload: ITokenPayload): Promise<ITokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, { expiresIn: '15m' }),
      this.jwtService.sign(payload, { expiresIn: '35m' }),
    ]);

    await this.prismaService.token.create({
      data: {
        userId: payload.sub,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async findByRefreshToken(token): Promise<Token> {
    return await this.prismaService.token.findFirst({
      where: { refreshToken: token },
    });
  }

  public async findByAccessToken(token): Promise<Token> {
    return await this.prismaService.token.findFirst({
      where: { accessToken: token },
    });
  }

  public async deleteManyByDate(createdAt: Date): Promise<void> {
    await this.prismaService.token.deleteMany({
      where: {
        createdAt: {
          lte: createdAt,
        },
      },
    });
  }
}
