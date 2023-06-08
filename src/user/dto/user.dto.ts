import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { UserConstant } from '../../core/constant';
import { Transform } from 'class-transformer';

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
