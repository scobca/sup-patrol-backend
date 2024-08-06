import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserProvider } from '../providers/user.provider';
import { GetUserInputDto } from '../dto/get-user-input.dto';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { AdminGuard } from '../../../guards/admin.guard';

@Controller('/user')
export class UserController {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  @Post('/getUser')
  public async getUser(@Body() data: GetUserInputDto) {
    return await this.userProvider.getUser(data);
  }

  @Delete('/deleteUser')
  @UseGuards(JwtAuthGuard, AdminGuard)
  public async deleteUser(@Body() data: { id: number }) {
    return await this.userProvider.deleteUser(data.id);
  }
}
