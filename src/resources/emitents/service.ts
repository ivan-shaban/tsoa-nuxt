import {
    inject,
    injectable,
} from 'inversify'
import {PrismaClient} from '@prisma/client'
import {Ids} from '../../constants/ioc'

@injectable()
export class EmitentsService {
    @inject(Ids.prisma)
    private readonly prisma!: PrismaClient

    public async getById(id: number) {
        const emitent = await this.prisma.emitent.findFirst({
            where: {
                id,
            },
        })

        return emitent
    }

    public async getByCode(code: string) {
        const emitent = await this.prisma.emitent.findFirst({
            where: {
                code,
            },
        })

        return emitent
    }

    // public create(userCreationParams: UserCreationParams) {
    //     return {
    //         id: Math.floor(Math.random() * 10000), // Random
    //         status: 'Happy',
    //         ...userCreationParams,
    //     }
    // }
}
