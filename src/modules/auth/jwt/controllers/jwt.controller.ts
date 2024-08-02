import { Controller, Inject } from '@nestjs/common';
import { JwtProvider } from '../providers/jwt.provider';

@Controller('jwt')
export class JwtController {
  constructor(@Inject(JwtProvider) private jwtProvider: JwtProvider) {}
}
