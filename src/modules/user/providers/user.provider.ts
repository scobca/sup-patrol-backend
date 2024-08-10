import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { GetUserOutputDto } from '../dto/get-user-output.dto';
import { UpdateUserInputDto } from '../dto/update-user-input.dto';
import { validateObject } from '../../../utils/validation.util';

@Injectable()
export class UserProvider {
  public async getById(id: number): Promise<GetUserOutputDto> {
    const user = await UserModel.findOne({
      where: { id: id },
    });

    return validateObject(new GetUserOutputDto(), user);
  }

  public async getAll(): Promise<UserModel[] | null> {
    return await UserModel.findAll();
  }

  public async updateUser(data: UpdateUserInputDto) {
    const user = await this.getById(data.id);
    const updateData: Partial<UserModel> = data.credits;

    if (user) {
      await UserModel.update(
        { ...updateData },
        {
          where: { id: data.id },
        },
      );

      return 'Changes saved';
    }
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
