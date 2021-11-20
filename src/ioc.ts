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
import {PrismaClient} from '@prisma/client'
import {Ids} from './constants/ioc'

// Create a new container tsoa can use
const iocContainer = new Container()

iocContainer.bind<PrismaClient>(Ids.prisma).toConstantValue(prisma)
iocContainer.bind(UsersService).toSelf().inSingletonScope()
iocContainer.bind(UsersController).toSelf().inSingletonScope()
// iocContainer.bind(TasksService).toSelf().inSingletonScope()
// iocContainer.bind(TasksController).toSelf().inSingletonScope()
// iocContainer.bind(LoginService).toSelf().inSingletonScope()
// iocContainer.bind(LoginController).toSelf().inSingletonScope()
// iocContainer.bind(BoardsService).toSelf().inSingletonScope()
// iocContainer.bind(BoardsController).toSelf().inSingletonScope()

decorate(injectable(), Controller) // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule())

// export according to convention
export {iocContainer}
