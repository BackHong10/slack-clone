import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Users)
    private readonly usesRepository: Repository<Users>,

    @InjectRepository(WorkspaceMembers)
    private readonly workspaceMembersRepository: Repository<WorkspaceMembers>,

    @InjectRepository(Workspaces)
    private readonly workspacesRepository: Repository<Workspaces>,

    @InjectRepository(ChannelMembers)
    private readonly channelMembersRepository: Repository<ChannelMembers>,

    @InjectRepository(Channels)
    private readonly channelsRepository: Repository<Channels>,
  ) {}

  async findById(id: number) {
    return this.workspacesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {}
}
