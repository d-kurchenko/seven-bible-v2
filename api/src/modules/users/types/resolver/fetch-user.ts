import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FetchUserInput {
  @Field({
    nullable: true,
  })
  id?: string;

  @Field({
    nullable: true,
  })
  username?: string;

  @Field(() => Boolean, {
    nullable: true,
  })
  resolved?: boolean;
}
