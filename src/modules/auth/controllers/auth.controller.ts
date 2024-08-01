import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { AuthProvider } from '../providers/auth.provider';
import { CreateAdminInputDto } from '../dto/create-admin-input.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthProvider) private authProvider: AuthProvider) {}

  @Post('/createAdmin')
  @HttpCode(200)
  async createAdmin(@Body() data: CreateAdminInputDto) {
    return this.authProvider.createAdmin(data);
  }
}
