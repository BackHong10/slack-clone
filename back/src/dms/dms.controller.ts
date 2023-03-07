import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiQuery, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('DM')
@Controller('api/workspaces/:url/dms')
export class DmsController {
  @ApiParam({
    name: 'url',
    required: true,
    description: '워크스페이스 url',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 id',
  })
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '가져오는 갯수',
  })
  @ApiQuery({
    name: 'Page',
    required: true,
    description: '페이지',
  })
  @Get(':id/chats')
  getChat(
    @Query('perPage') perPage, //
    @Query('page') page, //
    @Param() param, //
  ) {
    console.log(perPage, page, param.url, param.id);
  }

  @Post(':id/chats')
  postChat(
    @Body() body, //
  ) {
    console.log(body);
  }
}
