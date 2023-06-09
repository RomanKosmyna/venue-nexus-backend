import {Global, Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {AuthModule, AuthService} from '../../module/auth';
import {TokenModule, TokenService} from '../../module/token';
import {BearerStrategy} from './bearer.strategy';
import {UserModule, UserService} from "../../module/user";
import {CommonModule, CommonService} from "../../module/common";
import {PasswordService} from "../../module/password";

@Global()
@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'bearer'}),
        AuthModule,
        TokenModule,
        UserModule,
        CommonModule
    ],
    providers: [
        BearerStrategy,
        TokenService,
        AuthService,
        UserService,
        CommonService,
        PasswordService
    ],
    exports: [PassportModule],
})
export class PassportWrapperModule {
}