import { Controller, Get, Query, Res, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DataService } from './data.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DataQueryDto } from './data.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Data')
@Controller('data')
export class DataController {
    constructor(private dataService:DataService){}
    
    @UseGuards(AuthGuard('jwt'))
    @Get('query')
    async query(@Query() param:DataQueryDto, @Res() res: Response) {
        const response = await this.dataService.query(param)
        const {message} = response
        res.status(response.status).json(message)
    }
}
