import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaClient } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaClient, RolesGuard],
  exports:[UsuarioService]
})
export class UsuarioModule {}
