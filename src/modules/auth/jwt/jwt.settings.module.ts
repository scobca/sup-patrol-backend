import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtController } from './controllers/jwt.controller';
import { JwtProvider } from './providers/jwt.provider';

@Module({
  imports: [JwtModule, ConfigModule],
  controllers: [JwtController],
  providers: [JwtProvider],
  exports: [JwtProvider],
})
export class JwtSettingsModule {}
