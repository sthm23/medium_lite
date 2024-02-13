import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/loginInput.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum, User } from '../users/entities/user.entity';
import { CreateUserInput } from '../users/dto/create-user.input';

@Injectable()
export class AuthService {

    constructor(
        private userServ: UsersService,
        private jwtService: JwtService
    ) { }


    async validateUser(email: string, password: string) {
        const user = await this.userServ.findOneByEmail(email);
        const checkPassword = await bcrypt.compare(password, user.password)
        if (user && checkPassword) {
            return user
        }
        return null
    }

    async login(user: User) {
        const token = await this.getTokens(user.id, user.email, user.role);

        return {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            userId: user.id,
            role: user.role
        }
    }

    async signup(body: CreateUserInput) {
        return await this.userServ.create(body);
    }

    async getTokens(id: number, email: string, role: 'ADMIN' | 'USER') {
        const [at, rt] = await Promise.all([
            this.jwtService.sign({
                userId: id,
                email: email,
                role: role
            }, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: process.env.JWT_ACCESS_EXPIRE,
            }),
            this.jwtService.sign({
                userId: id,
                email: email,
                role: role
            }, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRE,
            })
        ]);

        return {
            userId: id,
            email: email,
            role: role,
            accessToken: at,
            refreshToken: rt
        }
    }

    getAccessToken(id: number, email: string, role: 'ADMIN' | 'USER') {
        const token = this.jwtService.sign({
            userId: id,
            email: email,
            role: role
        }, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRE,
        })

        return {
            accessToken: token
        }
    }

    refreshToken(body: { refreshToken: string }, user: User) {
        const access = this.getAccessToken(user.id, user.email, user.role)
        return { ...access, ...body }
    }

    logOut(user: User) {
        return true
    }

}
