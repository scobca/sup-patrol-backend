import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthProvider } from './providers/auth.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../user/models/user.model';
import { UserModule } from '../user/user.module';
import { BcryptUtil } from '../../utils/bcrypt.util';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConf } from '../../conf/jwt.conf';
import { JwtStrategy } from '../../strategies/jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConf.secret,
      signOptions: { expiresIn: jwtConf.secretOptions },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthProvider, BcryptUtil, JwtStrategy],
  exports: [AuthProvider, JwtModule],
})
export class AuthModule {}
