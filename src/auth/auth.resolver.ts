import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './entities/loginResponse.entity';
import { LoginInput } from './dto/loginInput.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(()=> LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(
        @Args('loginInput') loginInput: LoginInput
    ) {
        return this.authService.login(loginInput)
    }

}
