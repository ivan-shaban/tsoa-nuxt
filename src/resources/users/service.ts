import {User} from './models'
import {
    inject,
    injectable,
} from 'inversify'
import {PrismaClient} from '@prisma/client'
import {Ids} from '../../constants/ioc'

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>;

@injectable()
export class UsersService {
    @inject(Ids.prisma)
    private readonly prisma!: PrismaClient

    public async get(id: number): Promise<User> {
        const users = await this.prisma.user.findMany()
        console.log(`>> users`, users);

        return {
            id,
            email: 'jane@doe.com',
            name: 'Jane Doe',
            status: 'Happy',
            phoneNumbers: [],
        }
    }

    public create(userCreationParams: UserCreationParams): User {
        return {
            id: Math.floor(Math.random() * 10000), // Random
            status: 'Happy',
            ...userCreationParams,
        }
    }
}
