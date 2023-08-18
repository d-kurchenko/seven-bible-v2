import { InputType } from '@nestjs/graphql';
import { MaybeNull } from 'src/types';

@InputType()
export class CreateUserOptions {
  username!: string;
  password?: MaybeNull<string>;
}
