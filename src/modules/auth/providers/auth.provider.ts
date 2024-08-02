import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { UserProvider } from '../../user/providers/user.provider';
import { UserModel } from '../../user/models/user.model';
import { LoginUserInputDto } from '../dto/login-user-input.dto';
import { BcryptUtil } from '../../../utils/bcrypt.util';
import { Op } from 'sequelize';
import { TokenTypeEnum } from '../../../utils/token.type.enum';
import { JwtUtil } from '../../../utils/jwt.util';
import { GetUserTokenDto } from '../dto/get-user-token.dto';

@Injectable()
export class AuthProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(BcryptUtil) private bcrypt: BcryptUtil,
    @Inject(JwtUtil) private jwt: JwtUtil,
  ) {}

  public async createAdmin(data: CreateUserInputDto) {
    if ((await this.userProvider.getUser(data)) == null) {
      await UserModel.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        hash: await this.bcrypt.hashPassword(data.password),
        tokenType: TokenTypeEnum.ADMIN,
        tgID: data.tgID,
      });

      const credits: LoginUserInputDto = {
        email: data.email,
        password: data.password,
      };

      return this.login(credits);
    } else {
      console.log('error');
    }
  }

  public async login(data: LoginUserInputDto) {
    const user = await UserModel.findOne({
      where: {
        [Op.and]: [{ email: data.email }],
      },
    });

    if (user && (await this.bcrypt.compare(data.password, user.hash))) {
      const credits: GetUserTokenDto = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        tokenType: user.tokenType,
        tgID: user.tgID,
      };

      return {
        token: await this.jwt.signIn(credits),
        user: user,
      };
    } else {
      console.log('error');
    }
  }
}
