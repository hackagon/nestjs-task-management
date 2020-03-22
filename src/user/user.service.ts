import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDTO, UserDTO } from './user.dto'
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async createUser(user: UserDTO): Promise<User> {
        const { username, password, fullName } = user;

        const existUser = await this.userRepository.findOne({ username });
        if (existUser) throw new ConflictException('Username already exists.');

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = User.create({ username, password: hashedPassword, fullName });
        await newUser.save();

        return newUser;
    }
}
