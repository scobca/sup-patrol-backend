import { Controller, Get } from '@nestjs/common';
import { AppProvider } from '../providers/app.provider';

@Controller()
export class AppController {
  constructor(private readonly appService: AppProvider) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
