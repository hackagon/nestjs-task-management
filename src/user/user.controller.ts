import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CredentialsDTO, UserDTO } from './user.dto'

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get("/")
    getItems() {
        return "hello"
    }

    @Post('/')
    createUser(@Body(ValidationPipe) user: UserDTO) {
        return this.userService.createUser(user);
    }
}
