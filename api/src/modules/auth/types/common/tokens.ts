import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tokens {
  @Field()
  accessToken!: string;
  @Field()
  refreshToken!: string;
}
