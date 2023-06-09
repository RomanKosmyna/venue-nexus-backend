import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {join} from "path";
import {AuthModule} from "./module/auth";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "./module/user";
import {ServeStaticModule} from "@nestjs/serve-static";
import {ScheduleModule} from "@nestjs/schedule";
import {TokenModule} from "./module/token";
import {PrismaModule} from "./core/orm/prisma.module";
import {CronModule} from "./module/cron";
import {PassportWrapperModule} from "./core/passport";


@Module({
    imports: [
        AuthModule,
        JwtModule,
        UserModule,
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', 'public'),
        // }),
        ScheduleModule.forRoot(),
        TokenModule,
        PrismaModule,
        CronModule,
        PassportWrapperModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
