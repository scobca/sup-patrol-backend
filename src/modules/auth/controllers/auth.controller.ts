import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { AuthProvider } from '../providers/auth.provider';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { LoginUserInputDto } from '../dto/login-user-input.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthProvider) private authProvider: AuthProvider) {}

  @Post('/createAdmin')
  @HttpCode(200)
  async createAdmin(@Body() data: CreateUserInputDto) {
    return await this.authProvider.createAdmin(data);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() data: LoginUserInputDto) {
    return await this.authProvider.login(data);
  }
}
