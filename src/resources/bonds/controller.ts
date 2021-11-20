import createError from 'http-errors'
import {
    Controller,
    Get,
    Path,
    Route,
    Response,
} from 'tsoa'
import {BondsService} from './service'
import {
    inject,
    injectable,
} from 'inversify'

@Route('api/bonds')
@injectable()
export class BondsController extends Controller {
    @inject(BondsService)
    private readonly bondsService!: BondsService

    @Get('list')
    public getBondIdsList() {
        return this.bondsService.getIds()
    }

    @Get('{bondId}')
    @Response('404', 'NotFound')
    public async getBondById(
        @Path() bondId: number,
    ) {
        const bond = await this.bondsService.getById(bondId)
        if (bond) {
            return bond
        } else {
            throw new createError.NotFound(`No board with id: "${bondId}" found`)
        }
    }

    // @SuccessResponse('201', 'Created') // Custom success response
    // @Post()
    // public createBond(
    //     @Body() requestBody: UserCreationParams,
    // ) {
    //     this.setStatus(201) // set return status 201
    //     this.bondsService.create(requestBody)
    //     return
    // }
}
