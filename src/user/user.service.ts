import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository, JwtPayload } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialDTO, UserDTO } from './user.dto'
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
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

    async login(credential: CredentialDTO): Promise<any> {
        const { username, password } = credential;

        const existUser = await this.userRepository.findOne({ username })
        if (!existUser) throw new NotFoundException('User not found')

        const isMatched = this.userRepository.comparePassword(password, existUser.password);
        if (!isMatched) throw new UnauthorizedException("Password is incorrect")

        const payload: JwtPayload = _.pick(existUser, ["username", "fullName"]);
        // const token = await this.userRepository.generateToken(payload)
        const token = await this.jwtService.sign(payload);

        return {
            message: "Access grant",
            token
        }
    }
}
