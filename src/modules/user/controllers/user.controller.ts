import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserProvider } from '../providers/user.provider';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { AdminGuard } from '../../../guards/admin.guard';
import { UpdateUserInputDto } from '../dto/update-user-input.dto';
import { SuperAdminGuard } from '../../../guards/super-admin.guard';

@Controller('/user')
export class UserController {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  @Post('/getByID')
  public async getByID(@Body() data: { id: number }) {
    return await this.userProvider.getById(data.id);
  }

  @Get('/getAll')
  public async getAll() {
    return await this.userProvider.getAll();
  }

  @Patch('/updateUser')
  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  public async updateUser(@Body() data: UpdateUserInputDto) {
    return await this.userProvider.updateUser(data);
  }

  @Delete('/deleteUser')
  @UseGuards(JwtAuthGuard, AdminGuard)
  public async deleteUser(@Body() data: { id: number }) {
    return await this.userProvider.deleteUser(data.id);
  }
}
