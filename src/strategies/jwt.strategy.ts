import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserProvider } from '../modules/user/providers/user.provider';
import { jwtConf } from '../conf/jwt.conf';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserProvider) private readonly userProvider: UserProvider,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConf.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userProvider.getById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
