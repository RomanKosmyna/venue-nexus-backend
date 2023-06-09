import {
    Body,
    Controller,
    HttpStatus, Param,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import {User, Token} from '@prisma/client';
import {UserService} from '../user';
import {AuthService} from './auth.service';
import UserDto from '../user/dto/user.dto';

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
    }

    @Post('/login')
    async login(@Req() req, @Body() body: UserDto, @Res() res): Promise<Token> {
        return res.status(HttpStatus.OK).json(await this.authService.login(body));
    }

    @Post('/registration')
    async register(@Req() req, @Body() body: UserDto, @Res() res): Promise<User> {
        return res
            .status(HttpStatus.CREATED)
            .json(await this.userService.createUser(body));
    }

    @Post('/validateAccessToken/:token')
    async validateAccessToken(@Req() req, @Param("token") token: string, @Res() res) {

        return res.status(HttpStatus.OK).json(await this.authService.validateToken(token));
    }
}
