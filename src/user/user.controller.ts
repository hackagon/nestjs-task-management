import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CredentialsDTO } from './user.dto'

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get("/")
    getItems() {
        return "hello"
    }

    @Post('/')
    createUser(@Body(ValidationPipe) credentials: CredentialsDTO) {
        return this.userService.createUser(credentials);
    }
}
