import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { AuthProvider } from '../providers/auth.provider';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { LoginUserInputDto } from '../dto/login-user-input.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthProvider) private authProvider: AuthProvider) {}

  @Post('/createUser')
  @HttpCode(200)
  async createUser(@Body() data: CreateUserInputDto) {
    return await this.authProvider.createUser(data);
  }

  @Post('/createAdmin')
  @HttpCode(200)
  async createAdmin(@Body() data: CreateUserInputDto) {
    return await this.authProvider.createAdmin(data);
  }

  @Post('/createSuperAdmin')
  @HttpCode(200)
  async createSuperAdmin(@Body() data: CreateUserInputDto) {
    return await this.authProvider.createSuperAdmin(data);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() data: LoginUserInputDto) {
    return await this.authProvider.login(data);
  }
}
