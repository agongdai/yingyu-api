import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@/user/user.service';
import { tailorUserInSession, tailorVisibleUser } from '@/user/user.utils';

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

    const visibleUser = user ? tailorVisibleUser(user) : null;
    const payload = tailorUserInSession(user);

    return {
      ...visibleUser,
      bearer: await this.jwtService.signAsync(payload),
    };
  }
}
