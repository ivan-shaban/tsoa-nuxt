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

    public async getAll() {
        const emitents = await this.prisma.emitent.findMany()

        return emitents
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

    public async getCodes() {
        const codes = await this.prisma.emitent.findMany({
            select: {
                code: true,
            }
        })
        return codes.map(({code}) => code)
    }

}
