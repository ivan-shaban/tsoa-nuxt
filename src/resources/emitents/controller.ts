import createError from 'http-errors'
import {
    Controller,
    Get,
    Path,
    Route,
    Response,
} from 'tsoa'
import {EmitentsService} from './service'
import {
    inject,
    injectable,
} from 'inversify'
import {BondsService} from '../bonds/service'

@Route('api/emitents')
@injectable()
export class EmitentsController extends Controller {
    @inject(EmitentsService)
    private readonly emitentsService!: EmitentsService
    @inject(BondsService)
    private readonly bondsService!: BondsService

    // @Get('{id}')
    // @Response('404', 'NotFound')
    // public getEmitentById(
    //     @Path() id: number,
    // ) {
    //     const emitent = this.emitentsService.getById(id)
    //     if (emitent) {
    //         return emitent
    //     } else {
    //         throw new createError.NotFound(`No emitent with id: "${id}" found`)
    //     }
    // }

    @Get()
    public async getEmitents(
    ) {
        return this.emitentsService.getAll()
    }

    @Get('list')
    public async getEmitentCodes(
    ) {
        return this.emitentsService.getCodes()
    }

    @Get('{code}')
    @Response('404', 'NotFound')
    public async getEmitentByCode(
        @Path() code: string,
    ) {
        const emitent = await this.emitentsService.getByCode(code)
        if (emitent) {
            return emitent
        } else {
            throw new createError.NotFound(`No emitent with code: "${code}" found`)
        }
    }

    @Get('{code}/bonds')
    @Response('404', 'NotFound')
    public async getBonds(
        @Path() code: string,
    ) {
        return this.bondsService.getByEmitentCode(code)
    }

    // @SuccessResponse('201', 'Created') // Custom success response
    // @Post()
    // public createBond(
    //     @Body() requestBody: UserCreationParams,
    // ) {
    //     this.setStatus(201) // set return status 201
    //     this.emitentsService.create(requestBody)
    //     return
    // }
}
