import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Bible {
  @Field()
  bookName!: string;

  @Field()
  booksCount: number;
}
