import { UserInSession, VisibleUser } from '@/user/dto/user-in-session.dto';
import { User } from '@/user/entities/user.entity';

export const tailorUserInSession = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    roles: user.roles,
  } as UserInSession;
};

export const tailorVisibleUser = (user: User): VisibleUser => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...visibleUser } = user;
  return visibleUser;
};
