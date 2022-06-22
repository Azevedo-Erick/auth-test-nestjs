import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/usuario/usuario.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[PassportModule, UsuarioModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      privateKey:configService.get('JWT_SECRET_KEY'),
      signOptions:{
        expiresIn:'60s'
      }
    }),
    inject: [ConfigService],
  })],
  
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports:[AuthService],
  
})
export class AuthModule {}
