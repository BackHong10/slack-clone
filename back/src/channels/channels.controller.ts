import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('CHANNELS')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getChannels() {
    console.log('dkdkdk');
  }

  @Get(':name')
  getChannel() {
    console.log('dkdkdk');
  }

  @Post(':name')
  postChannels() {}

  @Get(':name/members')
  getMembers() {}

  @Post(':name/members')
  postMembers() {}

  @Get(':name/chats')
  getChat(
    @Query('perPage') perPage, //
    @Query('page') page, //
    @Param() param, //
  ) {
    console.log(perPage, page, param.url, param.id);
  }

  @Post(':name/chats')
  postChat(
    @Body() body, //
  ) {
    console.log(body);
  }
}
