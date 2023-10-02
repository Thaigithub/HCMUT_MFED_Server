import { Controller, Body, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserRegisterDto} from './user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @ApiBody({
        type:UserRegisterDto
    })
    @Post('register')
    async register(@Body() body:UserRegisterDto, @Res() res: Response) {
        const response = await this.userService.register(body)
        const {message} = response
        res.status(response.status).json(message)
        
    }
}