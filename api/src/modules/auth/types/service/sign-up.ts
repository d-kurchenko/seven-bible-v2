import { User } from 'src/modules/users/user.entity';
import { SignUpInput } from '../resolver';

export class SignUpOptions extends SignUpInput {}
export class SignUpResult {
  user!: User;
  accessToken!: string;
  refreshToken!: string;
}
