import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class JoinRequestDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
] as const) {
  // @ApiProperty({
  //   example: 'fhwm0241@naver.com',
  //   description: '이메일',
  //   required: true,
  // })
  // public email: string;
  // @ApiProperty({
  //   example: '지존흑염룡',
  //   description: '닉네임',
  //   required: true,
  // })
  // public nickname: string;
  // @ApiProperty({
  //   example: '1234',
  //   description: '비밀번호',
  //   required: true,
  // })
  // public password: string;
}
