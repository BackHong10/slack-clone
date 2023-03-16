import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entities/Users';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';
@ApiTags('WORKSPACES')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(
    private readonly workspaceService: WorkspacesService, //
  ) {}
  @Get()
  getMyWorkspaces(@User() user: Users) {
    return this.workspaceService.findById(user.id);
  }

  @Post()
  postWorkSpaces(
    @User() user: Users, //
    @Body() body: CreateWorkspaceDto,
  ) {
    return this.workspaceService.createWorkspace(
      body.workspace,
      body.url,
      user.id,
    );
  }

  @Get(':url/members')
  getMembers() {}

  @Post(':url/members')
  postMembers() {}

  @Delete(':url/members/:id')
  kickMembers() {}

  @Get(':url/members/:id')
  getMembersInfo() {}
}
