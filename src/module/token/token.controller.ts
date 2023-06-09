import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {TokenService} from './token.service';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {
    }

}
