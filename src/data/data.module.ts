import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { HttpModule } from 'nestjs-http-promise'

@Module({
  imports: [HttpModule],
  controllers: [DataController],
  providers: [DataService]
})
export class DataModule {}
