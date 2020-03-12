import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credentials } from './user.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get("/")
    getItems() {
        return "hello"
    }

    @Post('/signup')
    signUp(@Body() credentials: Credentials) {
        return this.authService.signUp(credentials);
    }
}
