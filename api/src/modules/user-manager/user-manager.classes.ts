import { ConfigType } from '@nestjs/config';
import {
  Inject, NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindOptionsWhere, Repository,
} from 'typeorm';
import { User } from 'src/modules/users/user.entity';
import { AppConfig } from 'src/configs';
import { UserStatus } from 'src/modules/users/types/common';

export class UserManager {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
    @InjectDataSource() readonly dataSource: DataSource,
    @Inject(AppConfig.KEY) protected readonly appConfig: ConfigType<typeof AppConfig>,
  ) {}

  async resolve(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    } as FindOptionsWhere<User>);

    if (!user) {
      throw new NotFoundException({
        message: `User with id "${userId}" not found`,
      });
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException({
        message: `User is not active`,
      });
    }

    if (
      !user.lastSeen ||
      Date.now() - user.lastSeen.getMilliseconds() > 10000
    ) {
      user.lastSeen = new Date();
      await this.userRepository.save(user);
    }

    return user;
  }
}
