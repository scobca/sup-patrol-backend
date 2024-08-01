import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppProvider } from './providers/app.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConf } from '../../conf/db.conf';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

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
  providers: [AppProvider],
})
export class AppModule {}
