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

    public async getByEmitentId(emitentId: number) {
        const bonds = await this.prisma.bond.findMany({
            where: {
                emitentId,
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
        const bonds = await this.prisma.bond.findMany()
        return bonds.map(({id}) => id)
    }
}
