import { Exclude } from 'class-transformer';

import { User } from './user.entity';

export class UserVisible extends User {
  @Exclude()
  password: string;

  constructor(partial: Partial<UserVisible>) {
    super();
    Object.assign(this, partial);
  }
}
