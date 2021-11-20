import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Route,
    SuccessResponse,
} from 'tsoa'
import {
    UserCreationParams,
    UsersService,
} from './service'
import {
    inject,
    injectable,
} from 'inversify'

@Route('api/users')
@injectable()
export class UsersController extends Controller {
    @inject(UsersService)
    private readonly usersService!: UsersService

    @Get('{userId}')
    public getUser(
        @Path() userId: number,
    ) {
        return this.usersService.getById(userId)
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public createUser(
        @Body() requestBody: UserCreationParams,
    ) {
        this.setStatus(201) // set return status 201
        this.usersService.create(requestBody)
        return
    }
}
