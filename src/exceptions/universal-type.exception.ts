import { HttpException } from '@nestjs/common';
import { HttpCodesEnum } from '../utils/http-codes.enum';

export class UniversalTypeException<T> extends HttpException {
  constructor(model: T, status: HttpCodesEnum) {
    super(model, status);
  }
}
