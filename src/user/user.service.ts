import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2'
import { UserRegisterDto } from './user.dto';
@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {}
    async register(body: UserRegisterDto){
        try {
            const user = await this.prismaService.user.findUnique({
                where:{
                    email: body.email
                }
            })
            if (user) {
                return {
                    status: 409,
                    message: "Email existed"
                }
            }
            const hasedPassword = await argon.hash(body.password)
            await this.prismaService.user.create({
                data: {
                    email: body.email,
                    hashedPassword: hasedPassword,
                }
            })
            return {
                status: 201,
                message:"Successful"
            }
        }
        catch(error){
            return {
                status: 500,
                message:error
            }
        }
        
    }
}