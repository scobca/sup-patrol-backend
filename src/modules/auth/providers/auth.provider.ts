import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInputDto } from '../dto/create-user-input.dto';
import { UserProvider } from '../../user/providers/user.provider';
import { UserModel } from '../../user/models/user.model';
import { LoginUserInputDto } from '../dto/login-user-input.dto';
import { BcryptUtil } from '../../../utils/bcrypt.util';
import { Op } from 'sequelize';
import { TokenTypeEnum } from '../../../utils/token.type.enum';
import { GetUserTokenDto } from '../dto/get-user-token.dto';
import { JwtService } from '@nestjs/jwt';
import { DoubleRecordException } from '../../../exceptions/double-record.exception';
import { findMatchingValues } from '../../../utils/matching-values.util';
import { validateObject } from '../../../utils/validation.util';
import { MatchingValuesUserOutputDto } from '../dto/matching-values-user-output.dto';
import { UniversalTypeException } from '../../../exceptions/universal-type.exception';
import { HttpCodesEnum } from '../../../utils/http-codes.enum';

@Injectable()
export class AuthProvider {
  constructor(
    @Inject(UserProvider) private userProvider: UserProvider,
    @Inject(BcryptUtil) private bcrypt: BcryptUtil,
    @Inject(JwtService) private jwt: JwtService,
  ) {}

  public async checkUnique(data: CreateUserInputDto) {
    const user = await UserModel.findOne({
      where: {
        [Op.or]: [
          { email: data.email },
          { phone: data.phone },
          { tgID: data.tgID },
        ],
      },
    });

    if (user) {
      const matchingValues = validateObject(
        new MatchingValuesUserOutputDto(),
        findMatchingValues(data, (await user).dataValues),
      );

      Object.keys(matchingValues).forEach((key) => {
        if (matchingValues[key] == undefined) {
          delete matchingValues[key];
        }
      });
      const model = Object.entries(matchingValues)[0];

      throw new DoubleRecordException(`{ ${model[0]}: ${model[1]} }`);
    } else {
      return true;
    }
  }

  public async createUser(data: CreateUserInputDto) {
    const checkUnique = await this.checkUnique(data);

    if (checkUnique) {
      const newUser = await UserModel.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        hash: await this.bcrypt.hashPassword(data.password),
        tokenType: TokenTypeEnum.USER,
        tgID: data.tgID,
      });

      const credits: LoginUserInputDto = {
        id: newUser.id,
        email: data.email,
        password: data.password,
      };

      return this.login(credits);
    }
  }

  public async createAdmin(data: CreateUserInputDto) {
    const checkUnique = await this.checkUnique(data);

    if (checkUnique) {
      const newUser = await UserModel.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        hash: await this.bcrypt.hashPassword(data.password),
        tokenType: TokenTypeEnum.ADMIN,
        tgID: data.tgID,
      });

      const credits: LoginUserInputDto = {
        id: newUser.id,
        email: data.email,
        password: data.password,
      };

      return await this.login(credits);
    }
  }

  public async createSuperAdmin(data: CreateUserInputDto) {
    const checkUnique = await this.checkUnique(data);

    if (checkUnique) {
      console.log(data);
      const newUser = await UserModel.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        hash: await this.bcrypt.hashPassword(data.password),
        tokenType: TokenTypeEnum.SUPER_ADMIN,
        tgID: data.tgID,
      });

      const credits: LoginUserInputDto = {
        id: newUser.id,
        email: data.email,
        password: data.password,
      };

      return this.login(credits);
    }
  }

  public async login(data: LoginUserInputDto) {
    const user = await UserModel.findOne({
      where: {
        [Op.and]: [{ email: data.email }],
      },
    });

    if (user && (await this.bcrypt.compare(data.password, user.hash))) {
      const payload: GetUserTokenDto = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        tokenType: user.tokenType,
        tgID: user.tgID,
      };

      return {
        token: this.jwt.sign(payload),
        user: user,
      };
    } else {
      throw new UniversalTypeException(
        'Неверные логин или пароль. Вход в аккаунт отклонен.',
        HttpCodesEnum.INVALID_CREDENTIALS,
      );
    }
  }
}
