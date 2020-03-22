import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './user.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get("/")
    getItems() {
        return "hello"
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) credentials: CredentialsDTO) {
        return this.authService.signUp(credentials);
    }
}
