import {
  Args, Query, Resolver,
} from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { FetchUserInput } from './types/resolver';
import { UsersService } from './users.service';
import { UserManager } from '../user-manager/user-manager.classes';
import { JwtAccessTokenGuard } from 'src/guards';
import { GqlActionContext } from 'src/decorators';
import { IActionContext } from 'src/types';

@UseGuards(JwtAccessTokenGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(
    readonly usersService: UsersService,
    readonly userManager: UserManager,
  ) {}

  @Query(() => User)
  async me(
    @GqlActionContext() context: IActionContext,
  ): Promise<User> {
    const { user } = context;

    await this.usersService.updateLastSeen(user.id);

    return user;
  }

  @Query(() => User)
  async user(
    @Args() input: FetchUserInput,
  ): Promise<User> {
    const { id, username } = input;

    let user: User;

    if (input.resolved) {
      if (!id) {
        throw new BadRequestException({
          message: `User id must be set in query params in resolved mode`,
        });
      }

      return await this.userManager.resolve(id);
    }

    if (id) {
      user = await this.usersService.getOneOrFail(id);
    } else if (username) {
      user = await this.usersService.getOneByUsernameOrFail(username);
    } else {
      throw new BadRequestException({
        message: `User id or username must be set in query params`,
      });
    }

    return user;
  }

  // @Mutation(() => User)
  // async createUser(
  //   @Args('input') input: CreateUserInput,
  // ): Promise<User> {
  //   return await this.usersService.create(input);
  // }
}
