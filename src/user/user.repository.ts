import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { CredentialsDTO } from './user.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(credentials: CredentialsDTO) {
        const user = new User();
        const { username, password } = credentials
        user.username = username;
        user.password = password;

        await user.save();
    }
}