import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import type { MaybeNull } from 'src/types';
import { MultiTypeormProviderDecoratorFactory } from 'src/multi';
import { UserStatus } from './types/common';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column({
    unique: true,
  })
  username!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  passwordHash?: MaybeNull<string>;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  refreshTokenHash?: MaybeNull<string>;

  @Field()
  @MultiTypeormProviderDecoratorFactory({
    postgres: CreateDateColumn({
      type: 'timestamptz',
      precision: 3,
    }),
    sqlite: CreateDateColumn({
      type: 'datetime',
      precision: 3,
    }),
  })
  createdAt!: Date;

  @MultiTypeormProviderDecoratorFactory({
    postgres: UpdateDateColumn({
      type: 'timestamptz',
      precision: 3,
    }),
    sqlite: UpdateDateColumn({
      type: 'datetime',
      precision: 3,
    }),
  })
  updatedAt!: Date;

  @Field()
  @MultiTypeormProviderDecoratorFactory({
    postgres: Column({
      type: 'timestamptz',
      precision: 3,
      default: () => 'now()',
    }),
    sqlite: Column({
      type: 'datetime',
      precision: 3,
      default: () => `datetime('now')`,
      // default: () => 'now()',
    }),
  })
  lastSeen!: Date;

  @MultiTypeormProviderDecoratorFactory({
    postgres: Column({
      type: 'timestamptz',
      precision: 3,
      nullable: true,
    }),
    sqlite: Column({
      type: 'datetime',
      precision: 3,
      nullable: true,
    }),
  })
  deletedAt?: MaybeNull<Date>;

  @Field(() => UserStatus)
  @Index()
  @MultiTypeormProviderDecoratorFactory({
    postgres: Column({
      type: 'enum',
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    }),
    sqlite: Column({
      type: 'varchar',
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    }),
  })
  status!: UserStatus;

  get isDeleted(): boolean {
    return this.status === 'DELETED';
  }
}

