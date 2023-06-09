import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { TokenService } from '../../module/token';
import { AuthService } from '../../module/auth';
import { Strategy } from 'passport-http-bearer';
import {User} from "@prisma/client";

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
    constructor(
        private readonly tokenService: TokenService,
        private readonly authService: AuthService,
    ) {
        super();
    }

    async validate(token): Promise<User> {
        const tokenFromDb = await this.tokenService.findByAccessToken(token);

        if (!tokenFromDb) {
            throw new NotFoundException('Token deleted or expired');
        }
        return await this.authService.validateToken(token);
    }
}