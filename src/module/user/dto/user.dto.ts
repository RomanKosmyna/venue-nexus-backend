import {IsNotEmpty, IsString, Length, Matches} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import {Transform} from "class-transformer";

import {UserConstant} from "../../../core/constant";

export default class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(4, 10)
  @Matches(UserConstant.username)
  username: string;

  @ApiProperty({ required: true, example: 'user@mail.com' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Matches(UserConstant.email)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(6, 14)
  @Matches(UserConstant.password)
  password: string;
}
