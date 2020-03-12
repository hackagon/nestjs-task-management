import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from './user.dto'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async signUp(credentials: Credentials): Promise<void> {
        return this.userRepository.signUp(credentials);
    }
}
