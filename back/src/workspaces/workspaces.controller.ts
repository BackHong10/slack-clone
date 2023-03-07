import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('WORKSPACES')
@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkspaces() {}

  @Post()
  postWorkSpaces() {}

  @Get(':url/members')
  getMembers() {}

  @Post(':url/members')
  postMembers() {}

  @Delete(':url/members/:id')
  kickMembers() {}

  @Get(':url/members/:id')
  getMembersInfo() {}
}
