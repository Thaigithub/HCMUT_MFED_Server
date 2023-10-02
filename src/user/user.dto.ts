import { IsEmail, IsNotEmpty, IsNumber, IsString, IsBoolean } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class UserRegisterDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
}