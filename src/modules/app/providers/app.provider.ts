import { Injectable } from '@nestjs/common';

@Injectable()
export class AppProvider {
  getHello(): string {
    return 'Hello World!';
  }
}
