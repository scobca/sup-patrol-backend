import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { UserProvider } from './providers/user.provider';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserProvider],
  exports: [UserProvider],
})
export class UserModule {}
