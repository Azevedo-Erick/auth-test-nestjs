import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule, AuthModule, UsuarioModule, PostModule, CategoryModule],
  controllers: [AppController],
 
})
export class AppModule {}
