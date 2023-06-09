import { ApiProperty } from '@nestjs/swagger';

export default class tokenDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
