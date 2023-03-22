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

  async createWorkspace(name: string, url: string, myId: number) {
    const workSpace = this.workspacesRepository.create({
      name,
      url,
      OwnerId: myId,
    });

    const returned = await this.workspacesRepository.save(workSpace);

    const workSpaceMember = new WorkspaceMembers();
    workSpaceMember.UserId = myId;
    workSpaceMember.WorkspaceId = returned.id;
    await this.workspaceMembersRepository.save(workSpaceMember);

    const channel = new Channels();
    channel.name = '일반';
    channel.WorkspaceId = returned.id;
    const channelReturned = await this.channelsRepository.save(channel);
    const channelMember = new ChannelMembers();
    channelMember.UserId = myId;
    channelMember.ChannelId = channelReturned.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkSpaceMembers(url: string) {
    return this.usesRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'members')
      .innerJoin('members.Workspace', 'workspace', 'w.url = :url', {
        url,
      })
      .getMany();
  }

  async getWorkSpaceMember(url: string, id: string) {
    return this.usesRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoin('user.Workspaces', 'workspaces', 'workspaces.url = :url', {
        url,
      })
      .getOne();
  }

  async createWorkspaceMembers(url: string, email: string) {
    const workspace = await this.workspacesRepository.findOne({
      where: {
        url,
      },
      relations: ['Channels'],
    });

    const user = await this.usesRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }

    const workSpaceMember = new WorkspaceMembers();
    workSpaceMember.WorkspaceId = workspace.id;
    workSpaceMember.UserId = user.id;
    await this.workspaceMembersRepository.save(workSpaceMember);

    const channelMember = new ChannelMembers();
    channelMember.UserId = user.id;
    channelMember.ChannelId = workspace.Channels.find(
      (v) => v.name === '일반',
    ).id;

    await this.channelMembersRepository.save(channelMember);
  }
}
