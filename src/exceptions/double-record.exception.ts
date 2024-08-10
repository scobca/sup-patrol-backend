import { HttpException } from '@nestjs/common';
import { HttpCodesEnum } from '../utils/http-codes.enum';

export class DoubleRecordException<T> extends HttpException {
  constructor(model: T) {
    super(
      `Пользователь с такими данными: ${model} уже существует.`,
      HttpCodesEnum.DOUBLE_RECORD,
    );
  }
}
