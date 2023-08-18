import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  DeepPartial, FindOptionsWhere, Not, Repository,
} from 'typeorm';
import { CreateUserOptions } from './types/service/create-user';
import { User } from './user.entity';
import { IdService } from 'src/modules/id/id.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MaybeNull } from 'src/types';
import { UserStatus } from './types/common';
import { USER_ENTITY_PREFIX } from './user.constants';
import { hash } from 'bcrypt';

export class UsersService {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
    @Inject(IdService) protected readonly idService: IdService,
  ) {}

  async getOne(id: string): Promise<MaybeNull<User>> {
    return await this.userRepository.findOneBy({
      id,
      status: Not(UserStatus.DELETED),
    } as FindOptionsWhere<User>);
  }

  async getOneByUsername(username: string): Promise<MaybeNull<User>> {
    return await this.userRepository.createQueryBuilder('u')
      .where(`LOWER(u.username) = LOWER(:username) AND u.status != :deletedStatus`, {
        username,
        deletedStatus: UserStatus.DELETED,
      })
      .getOne();
  }

  async getOneOrFail(id: string): Promise<User> {
    const user = await this.getOne(id);

    if (!user) {
      throw new NotFoundException({
        message: `User with id ${id} not found`,
      });
    }

    return user;
  }

  async getOneByUsernameOrFail(username: string): Promise<User> {
    // const logger = this.logger.forMethod('getOneByUsernameOrFail', context, {
    //   username,
    // });

    const user = await this.getOneByUsername(username);

    if (!user) {
      throw new NotFoundException({
        message: `User with username ${username} not found`,
      });
    }

    return user;
  }

  protected generateEntityId(): string {
    return this.idService.generateEntityId(USER_ENTITY_PREFIX);
  }

  async create(options: CreateUserOptions): Promise<User> {
    const { username, password } = options;

    let user = await this.userRepository.createQueryBuilder('u')
      .where('LOWER(u.username) = LOWER(:username)', {
        username,
      })
      .getOne();

    if (user && !user.isDeleted) {
      throw new InternalServerErrorException({
        message: `User with username ${username} is already registered`,
      });
    }

    const userId = this.generateEntityId();

    user = this.userRepository.create({
      id: userId,
      username,
      status: UserStatus.ACTIVE,
      deletedAt: null,
    } as DeepPartial<User>);

    if (password) {
      user.passwordHash = await hash(password, 10);
    }

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException({
        message: `Failed to create user`,
        error,
      });
    }

    return user;
  }

  async updateLastSeen(userId: string): Promise<void> {
    await this.userRepository.update({
      id: userId,
    }, {
      lastSeen: new Date(),
      updatedAt: new Date(),
    });
  }
}
