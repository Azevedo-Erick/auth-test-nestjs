import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';


@Controller()
export class AppController {

    constructor(private readonly authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() request ){
        return this.authService.login(request.user);
    }
}
