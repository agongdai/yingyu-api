import { Role } from '@/common/role.enum';
import { User } from '@/user/entities/user.entity';

export type UserInSession = {
  id: number;
  username: string;
  name: string;
  avatar: string;
  email: string;
  roles: Role[];
};

export type VisibleUser = Omit<User, 'password'>;
