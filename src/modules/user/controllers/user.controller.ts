import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserProvider } from '../providers/user.provider';
import { GetUserInputDto } from '../dto/get-user-input.dto';

@Controller('/user')
export class UserController {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  @Post('/getUser')
  public async getUser(@Body() data: GetUserInputDto) {
    return await this.userProvider.getUser(data);
  }
}
