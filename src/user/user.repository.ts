import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { CredentialDTO } from './user.dto'
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
    username: string;
    fullName: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    constructor(
        private jwtService: JwtService
    ) {
        super();
    }

    async createUser(credentials: CredentialDTO) {
        const user = new User();
        const { username, password } = credentials
        user.username = username;
        user.password = password;

        await user.save();
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hash)
        } catch (error) {
            throw new InternalServerErrorException("Internal server error")
        }
    }

    async generateToken(payload: JwtPayload): Promise<string> {
        return this.jwtService.sign(payload);
    }
}