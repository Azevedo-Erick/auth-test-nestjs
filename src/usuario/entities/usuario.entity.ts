import { Prisma, Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, isNotEmpty, Matches } from "class-validator";
import helpers from "src/helpers/validator-patterns.helper";

export class Usuario implements Prisma.UsuarioUncheckedCreateInput{
    id?: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastName?: string;

    @IsNotEmpty()
    @Matches(helpers.cpf)
    cpf: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()    
    @Matches(helpers.password)
    password: string;
    role: Role
}
