import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/usuario/usuario.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[PassportModule, UsuarioModule,JwtService, JwtModule.register(
    {
      privateKey:'I9fpX8/p1tkqqnpwsdK2imk3SPC+1MTPOkHqT+ewIYk=',
      signOptions:{
        expiresIn:'60s'
      }
    }
  )],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
