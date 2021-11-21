import {
    inject,
    injectable,
} from 'inversify'
import {PrismaClient} from '@prisma/client'
import {Ids} from '../../constants/ioc'

@injectable()
export class BondsService {
    @inject(Ids.prisma)
    private readonly prisma!: PrismaClient

    public async getById(id: number) {
        const bond = await this.prisma.bond.findFirst({
            where: {
                id,
            },
        })

        return bond ? {
            ...bond,
            startsAt: bond.startsAt.toISOString(),
            endsAt: bond.endsAt.toISOString(),
        } : null
    }

    public async getByEmitentCode(emitentCode: string) {
        const bonds = await this.prisma.bond.findMany({
            where: {
                emitentCode,
            },
        })

        return bonds.map((bond) => ({
            ...bond,
            startsAt: bond.startsAt.toISOString(),
            endsAt: bond.endsAt.toISOString(),
        }))
    }

    // public create(userCreationParams: UserCreationParams) {
    //     return {
    //         id: Math.floor(Math.random() * 10000), // Random
    //         status: 'Happy',
    //         ...userCreationParams,
    //     }
    // }

    public async getIds() {
        const ids = await this.prisma.bond.findMany({
            select: {
                id: true,
            },
        })
        return ids.map(({id}) => id)
    }
}
