import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDTO } from './user.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async signUp(credentials: CredentialsDTO): Promise<void> {
        return this.userRepository.signUp(credentials);
    }
}
