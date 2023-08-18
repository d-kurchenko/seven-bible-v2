import {
  Field, InputType, ObjectType,
} from '@nestjs/graphql';
import { CreateUserInput } from 'src/modules/users/types/resolver';
import { User } from 'src/modules/users/user.entity';

@ObjectType()
export class SignUpPayload {
  @Field(() => User)
  user!: User;

  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}

@InputType()
export class SignUpInput extends CreateUserInput {}

