import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDTO } from './user.dto'
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async createUser(credentials: CredentialsDTO): Promise<User> {
        const { username, password } = credentials;

        const existUser = await this.userRepository.findOne({ username });
        if (existUser) throw new ConflictException('Username already exists.');

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, password: hashedPassword });
        await user.save();

        return user;
    }
}
