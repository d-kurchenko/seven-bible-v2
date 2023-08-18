import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @Length(2, 50)
  username!: string;

  @Field()
  @Length(6, 50)
  password!: string;
}
