import { Injectable } from '@nestjs/common';
import { DataQueryDto } from './data.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from 'nestjs-http-promise'

@Injectable()
export class DataService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ){}
    async query(body: DataQueryDto){
        try{
            const response = await this.httpService.get(`${this.configService.get('BACKEND_PYTHON_SERVICE')}?from=${body.from}&to=${body.to}&type=${body.type}`, {
                headers:{
                    Authorization: `Bearer ${this.configService.get('SECRETE_PYTHON_KEY')}`
                }
            })
            return {
                status:response.status,
                message: response.data
            }
        }
        catch(e){
            console.log(e);
        }
    }
}
