import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserVisible } from '@/user/entities/user.visible';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const visibleUser = user ? new UserVisible(user) : null;
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      roles: user.roles,
    };

    return {
      ...visibleUser,
      bearer: await this.jwtService.signAsync(payload),
    };
  }
}
