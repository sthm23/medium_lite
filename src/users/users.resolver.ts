import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { RoleEnum, User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { RolesGuard } from '../auth/guard/role.guard';
import { OffsetPaginationArgs } from './dto/offset-pagination.dto';

@Resolver(() => User)
@UseGuards(RolesGuard)
@Roles(RoleEnum.ADMIN)
@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe())
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() args: OffsetPaginationArgs
  ) {
    return this.usersService.findAll(args);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }


  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
