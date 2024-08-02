import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtProvider {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  public async verify(token: string) {
    return await this.jwtService.verify(token, {
      secret: this.configService.get('main.jwtSecret'),
    });
  }
}
