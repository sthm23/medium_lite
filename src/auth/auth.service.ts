import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/loginInput.dto';

@Injectable()
export class AuthService {
    
    constructor(
        private userServ: UsersService
    ) {}


    async validateUser(email:string, password:string) {
        const user = await this.userServ.findOneByEmail(email);
        const checkPassword = await bcrypt.compare(password, user.password)
        if(user && checkPassword) {
            return user
        }
        return null
    }

    async login(loginResponse:LoginInput) {
        const user = await this.userServ.findOneByEmail(loginResponse.email);

        return {
            accessToken: 'access-jwt',
            refreshToken: 'refresh-jwt',
            userId: 1,
            role: 'Admin'
        }
    }

}
