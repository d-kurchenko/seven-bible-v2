import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from '../users/user.entity';
import { JwtAcessTokenStrategy, JwtRefreshTokenStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
    }),
    UsersModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtAcessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
})
export class AuthModule {}
