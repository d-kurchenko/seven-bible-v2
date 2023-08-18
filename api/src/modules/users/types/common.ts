import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'Users has two statuses: ACTIVE and DELETED.',
});

export const defaultUserStatuses = [
  UserStatus.ACTIVE,
];
