import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {hash, compareSync} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
    constructor(private readonly usuarioService:UsuarioService, private jwtService: JwtService){}

    async validateUser(email:string, password:string):Promise<any>{


        const pessoa = await this.usuarioService.findByEmail(email);

        

        const isPasswordValid = compareSync(password , pessoa.password);
        
        if(isPasswordValid){
            const  {email, password,role} = pessoa;
            return {email,password,role};
        }
        return null;

    }

    async login(user){
        const payload = {email:user.email, password:user.password, role:user.role};
        return {
            access_token:this.jwtService.sign(payload)
        }
    }
}
