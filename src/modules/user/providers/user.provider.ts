import { Injectable } from '@nestjs/common';
import { GetUserInputDto } from '../dto/get-user-input.dto';
import { UserModel } from '../models/user.model';
import { Op } from 'sequelize';
import { GetUserOutputDto } from '../dto/get-user-output.dto';
import { CreateUserInputDto } from '../../auth/dto/create-user-input.dto';

@Injectable()
export class UserProvider {
  public async getUser(data: CreateUserInputDto | GetUserInputDto) {
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

  public async getById(email: string) {
    return await UserModel.findOne({
      where: { email: email },
    });
  }

  public async deleteUser(id: number) {
    const user = await UserModel.findOne({
      where: { id: id },
    });

    if (user) {
      return await UserModel.destroy({
        where: { id: id },
      });
    } else {
      console.log('error');
    }
  }
}
