import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Bible {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  bookName!: string;

  @Column()
  @Field()
  booksCount: number;
}
