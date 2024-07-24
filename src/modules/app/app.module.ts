import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppProvider } from './providers/app.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppProvider],
})
export class AppModule {}
