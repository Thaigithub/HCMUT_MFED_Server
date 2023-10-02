import { IsISO8601, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class DataQueryDto {
    @ApiProperty()
    @IsISO8601()
    @IsNotEmpty()
    from: string

    @ApiProperty()
    @IsISO8601()
    @IsNotEmpty()
    to: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    type: string
}