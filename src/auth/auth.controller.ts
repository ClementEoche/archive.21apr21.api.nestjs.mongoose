import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    tempAuth(){
        return {auth: 'works'};
    }

    @Post('login')
    async login(@Body() userDTO: LoginDTO){ 

        const user = await this.userService.findByLogin(userDTO);
        const payload = {
            name : user.name,
        }
        const token = await this.authService.signPayload(payload);
        return {user, token};
    }

    @Get('logout')
    async logout(@Body() userDTO: LoginDTO){ 

        const user = undefined;
        const token = 0;
        return {user, token};
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO){
        const user = await this.userService.create(userDTO);
        const payload = {
            name : user.name,
        }
        const token = await this.authService.signPayload(payload);
        return {user, token};
    }
}
