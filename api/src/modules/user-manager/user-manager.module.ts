import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/user.entity';
import { USER_MANAGER } from './user-manager.constant';
import { UserManager } from './user-manager.classes';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserManager,
    {
      provide: USER_MANAGER,
      useExisting: UserManager,
    },
  ],
  exports: [
    UserManager,
    {
      provide: USER_MANAGER,
      useExisting: UserManager,
    },
  ],
})
export class UserManagerModule {}
