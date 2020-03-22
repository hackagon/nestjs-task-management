import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CredentialDTO, UserDTO } from './user.dto'

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

    @Post('/login')
    login(@Body() credential: CredentialDTO) {
        return this.userService.login(credential);
    }
}
