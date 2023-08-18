import {
  Field, InputType, ObjectType,
} from '@nestjs/graphql';
import { User } from 'src/modules/users/user.entity';
import { Tokens } from '../common';

@InputType()
export class SignInInput {
  @Field()
  username!: string;

  @Field()
  password!: string;
}

@ObjectType()
export class SignInPayload extends Tokens {
  @Field(() => User)
  user!: User;
}
