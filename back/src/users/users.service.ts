import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async postUsers(email: string, nickname: string, password: string) {
    if (!email || !nickname || !password) {
      throw new ConflictException('회원정보를 제대로 입력해 주십시오.');
    }
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException('이미 존재하는 회원입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });

    return '회원가입 성공!';
  }
}
