import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserManagerModule } from '../user-manager/user-manager.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserManagerModule,
  ],
  providers: [
    UsersService,
    UsersResolver,
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {}
