import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserTokenDto } from '../modules/auth/dto/get-user-token.dto';

@Injectable()
export class JwtUtil {
  constructor(private jwtService: JwtService) {}

  public signIn(data: GetUserTokenDto) {
    return this.jwtService.signAsync({
      name: data.name,
      email: data.email,
      phone: data.phone,
      tokenType: data.tokenType,
      tgID: data.tgID,
    });
  }
}
