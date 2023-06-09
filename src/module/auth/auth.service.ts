import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user';
import {CommonService} from '../common';
import {EDbField, EDynamicallyAction} from '../../core/enum';
import CreateUserDto from '../user/dto/user.dto';
import {PasswordService} from '../password';
import {TokenService} from "../token";
import {ITokenPair, ITokenPayload} from "../../core/interface";
import {User} from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly commonService: CommonService,
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService,
    ) {
    }

    public async login(body: CreateUserDto) {
        const user = await this.commonService.checkIfUserExists(
            EDynamicallyAction.NEXT,
            body.email,
            EDbField.EMAIL,
        );

        await this.passwordService.compare(body.password, user.password);

        const tokenPair: ITokenPair =  await this.tokenService.createTokenPair({
            sub: user.id,
            username: user.username
        });

        return {...tokenPair, user}
    }

    public async validateToken(token): Promise<User> {
        const payload = (await this.tokenService.verifyToken(
            token,
        )) as ITokenPayload;

        const user = await this.commonService.checkIfUserExists(
            EDynamicallyAction.NEXT,
            payload.sub,
            EDbField.ID,
        );

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
