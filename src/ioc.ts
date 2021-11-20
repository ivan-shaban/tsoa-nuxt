import {
    Container,
    decorate,
    injectable,
} from 'inversify'
import {buildProviderModule} from 'inversify-binding-decorators'
import {Controller} from 'tsoa'
import {UsersController} from './resources/users/controller'
import {UsersService} from './resources/users/service'
import {prisma} from './util/prisma'
import {Ids} from './constants/ioc'
import {BondsController} from './resources/bonds/controller'
import {BondsService} from './resources/bonds/service'
import {EmitentsService} from './resources/emitents/service'
import {EmitentsController} from './resources/emitents/controller'

// Create a new container tsoa can use
const iocContainer = new Container()

iocContainer.bind(Ids.prisma).toConstantValue(prisma)
iocContainer.bind(UsersService).toSelf().inSingletonScope()
iocContainer.bind(UsersController).toSelf().inSingletonScope()
iocContainer.bind(BondsService).toSelf().inSingletonScope()
iocContainer.bind(BondsController).toSelf().inSingletonScope()
iocContainer.bind(EmitentsService).toSelf().inSingletonScope()
iocContainer.bind(EmitentsController).toSelf().inSingletonScope()
// iocContainer.bind(BoardsService).toSelf().inSingletonScope()
// iocContainer.bind(BoardsController).toSelf().inSingletonScope()

decorate(injectable(), Controller) // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule())

// export according to convention
export {iocContainer}
