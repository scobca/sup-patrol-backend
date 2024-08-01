import { Injectable } from '@nestjs/common';
import { GetUserInputDto } from '../dto/get-user-input.dto';
import { UserModel } from '../models/user.model';
import { Op } from 'sequelize';
import { GetUserOutputDto } from '../dto/get-user-output.dto';

@Injectable()
export class UserProvider {
  public async getUser(data: GetUserInputDto) {
    return await UserModel.findOne({
      where: {
        [Op.or]: [
          { email: data.email },
          { phone: data.phone },
          { tgID: data.tgID },
        ],
      },
    }).then((res: GetUserOutputDto | null) => {
      return res;
    });
  }
}
