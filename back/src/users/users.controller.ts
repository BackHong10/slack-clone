import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { User } from 'src/common/decorator/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptor/undefinedtoNull.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '회원정보 조회' })
  @Get()
  getUsers(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  postUsers(
    @Body() data: JoinRequestDto, //
  ) {
    return this.usersService.postUsers(
      data.email,
      data.nickname,
      data.password,
    );
  }

  @ApiResponse({
    type: UserDto,
    status: 200,
    description: '성공',
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(
    @User() user, //
  ) {
    console.log('로그인');
  }

  @ApiResponse({
    type: UserDto,
    status: 200,
    description: '성공',
  })
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(
    @User() user, //
  ) {
    console.log('로그아웃');
  }
}
