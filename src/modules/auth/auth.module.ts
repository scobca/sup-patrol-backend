import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthProvider } from './providers/auth.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../user/models/user.model';
import { UserModule } from '../user/user.module';
import { BcryptUtil } from '../../utils/bcrypt.util';
import { JwtUtil } from '../../utils/jwt.util';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptionsModule } from './jwt/jwt.options.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    JwtModule.registerAsync({
      useClass: JwtOptionsModule,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthProvider, BcryptUtil, JwtUtil],
  exports: [
    JwtModule.registerAsync({
      useClass: JwtOptionsModule,
    }),
    AuthProvider,
    JwtUtil,
  ],
})
export class AuthModule {}
