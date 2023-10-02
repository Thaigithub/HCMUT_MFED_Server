import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto} from './auth.dto';
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}
    async login(body: AuthLoginDto){
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: body.email
                },
                select: {
                    id: true,
                    hashedPassword: true,
                }
            })
            if(!user) {
                return {
                    message: "User not found",
                    accessToken: null,
                    status: 404
                }
            }
            const passwordMatched = await argon.verify(user.hashedPassword, body.password)
            if (!passwordMatched) {
                return {
                    message: "Wrong password",
                    accessToken: null,
                    status: 401
                }
            }
            const jwtToken = await this.jwtService.signAsync({
                userId: user.id,
            },{
                expiresIn: '8h',
                secret: this.configService.get('JWT_SECRET')
            })
            return {
                message: "Successful",
                accessToken: jwtToken,
                status: 200
            }
        }
        catch(error) {
            console.log(error)
        }
    }
}
