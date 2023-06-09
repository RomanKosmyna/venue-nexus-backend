import {Global, Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {UserModule} from '../user';
import {CommonModule} from '../common';
import {PasswordModule} from '../password';
import {UserService} from '../user';
import {CommonService} from '../common';
import {PasswordService} from '../password';
import {AuthController} from './auth.controller';
import {TokenModule, TokenService} from "../token";

@Global()
@Module({
    providers: [
        AuthService,
        UserService,
        CommonService,
        PasswordService,
        TokenService
    ],
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
        }),
        UserModule,
        CommonModule,
        PasswordModule,
        TokenModule
    ],
    controllers: [AuthController],
})
export class AuthModule {
}
