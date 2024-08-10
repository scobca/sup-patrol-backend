import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppProvider } from './providers/app.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConf } from '../../conf/db.conf';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { DoubleRecordFilter } from '../../filters/double-record.filter';
import { BaseHttpExceptionFilter } from '../../filters/base-http-exception.filter';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      ...dbConf,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppProvider,
    {
      provide: APP_FILTER,
      useClass: DoubleRecordFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BaseHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
