import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaClient]
})
export class PostModule {}
