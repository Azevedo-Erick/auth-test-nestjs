import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { hashSync } from 'bcrypt';
@Injectable()
export class UsuarioService {
  constructor(private readonly prisma:PrismaClient){}
  create(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data:{
        ...createUsuarioDto,
        password: hashSync(createUsuarioDto.password,10)
      },
      
    })
  }

  findAll() {
    return this.prisma.usuario.findMany(
      {
        include:{
          posts:true
        }
      }
    );
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique(
      {
        where:{
          id:id
        },
        include:{
          posts:true
        }
      }
    )
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update(
      {
        data:{...updateUsuarioDto},
        where:{
          id:id
        }
      }
    )
  }

  remove(id: number) {
    return this.prisma.usuario.delete(
      {
        where:{
          id:id
        }
      }
    )
  }

  findByEmail(email:string){
    return this.prisma.usuario.findFirst({
      where:{
        email:{
          equals:email
        }
      }
    })
  }
}
