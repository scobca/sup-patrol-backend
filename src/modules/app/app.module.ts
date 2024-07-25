import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppProvider } from './providers/app.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConf } from '../../conf/db.conf';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      ...dbConf,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppProvider],
})
export class AppModule {}
