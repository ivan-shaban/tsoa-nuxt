import {Bond as PrismaBond} from '@prisma/client'

export enum BondStatus {
    NOT_POSTED = 'NOT_POSTED',
    POSTED = 'POSTED',
    SOLD = 'SOLD',
    REDEEMED = 'REDEEMED'
}

export enum Currency {
    BYN = 'BYN',
    RUB = 'RUB',
    USD = 'USD',
    EUR = 'EUR'
}

export type Bond = PrismaBond & {
    status: BondStatus
    currency: Currency
}
