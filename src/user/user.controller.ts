import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CredentialsDTO } from './user.dto'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get("/")
    getItems() {
        return "hello"
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) credentials: CredentialsDTO) {
        return this.userService.signUp(credentials);
    }
}
