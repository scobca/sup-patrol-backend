import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { jwtConf } from '../../../conf/jwt.conf';

export class JwtOptionsModule implements JwtOptionsFactory {
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: jwtConf.secret,
      signOptions: { expiresIn: jwtConf.secretOptions },
    };
  }
}
