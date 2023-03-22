import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
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
    return this.channelsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getWorkspaceChannels(url: string, myId: number) {
    return this.channelsRepository
      .createQueryBuilder('channels')
      .innerJoinAndSelect(
        'channels.ChannelMembers',
        'cm',
        'cm.userId = :myId',
        { myId },
      )
      .innerJoinAndSelect('channels.Workspace', 'w', 'w.url = :url', { url })
      .getMany();
  }

  async getWorkspaceChannel(url: string, name: string) {
    return this.channelsRepository.findOne({
      where: {
        name,
      },
      relations: ['Workspace'],
    });
  }
}
