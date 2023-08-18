import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignOutInput {
  @Field()
  refreshToken!: string;
}
