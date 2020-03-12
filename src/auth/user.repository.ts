import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { Credentials } from './user.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(credentials: Credentials) {
        const user = new User();
        const { username, password } = credentials
        user.username = username;
        user.password = password;

        await user.save();
    }
}