import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma:PrismaClient){}
  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data:{
        ...createPostDto
      }
    })
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findFirst(
      {
        where:{
          id:id
        }
      }
    )
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      data:{
        ...updatePostDto
      },
      where:{
        id:id
      }
    })
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where:{
        id:id
      }
    })
  }
}
