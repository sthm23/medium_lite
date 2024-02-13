import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './entities/loginResponse.entity';
import { LoginInput } from './dto/loginInput.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/auth.guard';
import { RefreshJwtGuard } from './guard/jwt-refresh.guard';
import { JwtGuard } from './guard/jwt.guard';
import { RefreshTokenResponse } from './entities/refresh.entity';
import { RefreshInput } from './dto/refreshInput.dto';
import { User } from '../users/entities/user.entity';
import { CreateUserInput } from '../users/dto/create-user.input';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(
        @Args('loginInput') loginInput: LoginInput,
        @Context() context: any,
    ) {
        return this.authService.login(context.user)
    }

    @Mutation(() => User)
    signup(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ) {
        return this.authService.signup(createUserInput)
    }

    @Mutation(() => RefreshTokenResponse)
    @UseGuards(RefreshJwtGuard)
    async refreshToken(
        @Context() context: any,
        @Args('refreshInput') refreshInput: RefreshInput,
    ) {
        return this.authService.refreshToken(refreshInput, context.req.user)
    }

    @Mutation(() => Boolean)
    @UseGuards(JwtGuard)
    async logout(
        @Context() context: any,
    ): Promise<boolean> {
        return this.authService.logOut(context.req.user)
    }

}
