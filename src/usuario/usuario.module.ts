import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaClient],
  exports:[UsuarioService]
})
export class UsuarioModule {}
