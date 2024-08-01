import { Inject, Injectable } from '@nestjs/common';
import { CreateAdminInputDto } from '../dto/create-admin-input.dto';
import { UserProvider } from '../../user/providers/user.provider';
import { UserModel } from '../../user/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthProvider {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);
  }

  public async createAdmin(data: CreateAdminInputDto) {
    if ((await this.userProvider.getUser(data)) == null) {
      return await UserModel.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: await this.hashPassword(data.password),
        tokenType: 'ADMIN',
        tgID: data.tgID,
      });
    } else {
      console.log('error');
    }
  }
}
