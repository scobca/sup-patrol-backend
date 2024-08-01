import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthProvider } from './providers/auth.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../user/models/user.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), UserModule],
  controllers: [AuthController],
  providers: [AuthProvider],
  exports: [],
})
export class AuthModule {}
